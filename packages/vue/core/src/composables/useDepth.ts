import type { ComputedRef, InjectionKey, MaybeRefOrGetter } from 'vue'
import { computed, inject, onBeforeUnmount, provide, reactive, shallowRef, toValue, watch } from 'vue'
import { useConfig } from './useConfig'

type DepthOwnerType = 'dialog' | 'popover' | 'menu' | 'hover-card' | 'floating-panel'
type DepthFloatingType = 'tooltip' | 'popover' | 'menu' | 'hover-card' | 'floating-panel'

export interface DepthOwner {
  id: string
  type: DepthOwnerType
  active: ComputedRef<boolean>
  parent?: DepthOwner
  index: ComputedRef<number>
  backdropZIndex: ComputedRef<string>
  contentZIndex: ComputedRef<string>
  floatingBaseZIndex: ComputedRef<string>
  bringToFront: () => void
}

export interface DepthFloatingLayer {
  id: string
  type: DepthFloatingType
  ownerId?: string
  order: ComputedRef<number>
  zIndex: ComputedRef<string>
}

export interface UseTeleportedDepthOptions {
  type: DepthFloatingType
  active: MaybeRefOrGetter<boolean>
  fallbackZIndex?: MaybeRefOrGetter<string>
}

export interface UseDepthOwnerOptions {
  active?: MaybeRefOrGetter<boolean>
  baseZIndex?: MaybeRefOrGetter<string | undefined>
  root?: MaybeRefOrGetter<boolean>
  contentOffset?: MaybeRefOrGetter<number>
  floatingOffset?: MaybeRefOrGetter<number>
}

export interface UseTeleportedDepthOwnerOptions {
  type: Exclude<DepthFloatingType, 'tooltip'>
  active: MaybeRefOrGetter<boolean>
  fallbackZIndex?: MaybeRefOrGetter<string>
}

const DEPTH_OWNER_KEY: InjectionKey<DepthOwner> = Symbol('RaxiumDepthOwner')
const DEFAULT_DEPTH_BASE_VAR = 'var(--z-modal)'
const DEFAULT_DEPTH_STEP = 10
let idSeed = 0

const ownerRecords = reactive<Array<{ id: string, type: DepthOwnerType }>>([])
const floatingRecords = reactive<Array<{ id: string, type: DepthFloatingType, ownerId?: string }>>([])
const rootRecords = reactive<Array<{ id: string, kind: 'owner' | 'floating' }>>([])
const ownerInstances = new Map<string, DepthOwner>()

function createDepthId(type: string) {
  idSeed += 1
  return `${type}-${idSeed}`
}

function indexOfOwner(id: string) {
  return Math.max(0, rootRecords.findIndex(layer => layer.id === id))
}

function orderOfFloating(id: string, ownerId?: string) {
  return floatingRecords
    .filter(layer => layer.ownerId === ownerId)
    .findIndex(layer => layer.id === id)
}

function indexOfRootFloating(id: string) {
  return Math.max(0, rootRecords.findIndex(layer => layer.id === id))
}

function zIndexAt(index: number, offset: number, baseVar: string, step: number) {
  return `calc(${baseVar} + ${index * step + offset})`
}

function addZIndexOffset(zIndex: string, offset: number) {
  return offset === 0 ? zIndex : `calc(${zIndex} + ${offset})`
}

function useDepthTokens(): { baseVar: ComputedRef<string>, step: ComputedRef<number> } {
  const config = useConfig('depth')
  const baseVar = computed(() => config.value?.baseZIndex ?? DEFAULT_DEPTH_BASE_VAR)
  const step = computed(() => config.value?.step ?? DEFAULT_DEPTH_STEP)
  return { baseVar, step }
}

function ownerById(id: string | undefined) {
  if (!id || !ownerRecords.some(owner => owner.id === id))
    return undefined

  return ownerInstances.get(id)
}

function resolveActiveOwner(owner: DepthOwner | undefined): DepthOwner | undefined {
  if (!owner)
    return undefined

  if (owner.active.value && ownerById(owner.id))
    return owner

  return resolveActiveOwner(owner.parent)
}

export function provideDepthOwner(owner: DepthOwner) {
  provide(DEPTH_OWNER_KEY, owner)
}

export function injectDepthOwner() {
  return resolveActiveOwner(inject(DEPTH_OWNER_KEY, undefined))
}

export function useDepthOwner(
  type: DepthOwnerType,
  options: UseDepthOwnerOptions = {},
): DepthOwner {
  const id = createDepthId(type)
  const ownerRecord = { id, type }
  const active = computed(() => toValue(options.active) ?? true)
  const parent = inject(DEPTH_OWNER_KEY, undefined)
  const root = computed(() => toValue(options.root) ?? !toValue(options.baseZIndex))
  const contentOffset = computed(() => toValue(options.contentOffset) ?? (type === 'dialog' ? 1 : 0))
  const floatingOffset = computed(() => toValue(options.floatingOffset) ?? (type === 'dialog' ? 2 : 1))
  const { baseVar, step } = useDepthTokens()

  function registerOwner() {
    if (!ownerRecords.some(owner => owner.id === id)) {
      ownerRecords.push(ownerRecord)
      if (root.value)
        rootRecords.push({ id, kind: 'owner' })
    }
  }

  function unregisterOwner() {
    const ownerIndex = ownerRecords.findIndex(owner => owner.id === id)
    if (ownerIndex !== -1)
      ownerRecords.splice(ownerIndex, 1)

    const rootIndex = rootRecords.findIndex(owner => owner.id === id)
    if (rootIndex !== -1)
      rootRecords.splice(rootIndex, 1)
  }

  const index = computed(() => indexOfOwner(id))
  const baseZIndex = computed(() => toValue(options.baseZIndex) ?? zIndexAt(index.value, 0, baseVar.value, step.value))

  function bringToFront() {
    const rootIndex = rootRecords.findIndex(record => record.id === id)
    if (rootIndex === -1 || rootIndex === rootRecords.length - 1)
      return
    const [record] = rootRecords.splice(rootIndex, 1)
    rootRecords.push(record)
  }

  const owner: DepthOwner = {
    id,
    type,
    active,
    parent,
    index,
    backdropZIndex: computed(() => baseZIndex.value),
    contentZIndex: computed(() => addZIndexOffset(baseZIndex.value, contentOffset.value)),
    floatingBaseZIndex: computed(() => addZIndexOffset(baseZIndex.value, floatingOffset.value)),
    bringToFront,
  }
  ownerInstances.set(id, owner)

  if (active.value)
    registerOwner()

  // Owners stay in the stack for the entire mount lifecycle. Activation only
  // affects ordering (bring-to-front), never removal. This keeps z-index stable
  // for closed-but-still-mounted content (e.g. unmountOnExit=false) so stale
  // overlays never leap above active ones.
  watch(
    active,
    (isActive) => {
      if (isActive) {
        registerOwner()
        bringToFront()
      }
    },
  )

  onBeforeUnmount(() => {
    unregisterOwner()
    ownerInstances.delete(id)
    for (let i = floatingRecords.length - 1; i >= 0; i -= 1) {
      if (floatingRecords[i].ownerId === id)
        floatingRecords.splice(i, 1)
    }
  })

  return owner
}

function registerFloatingLayer(
  type: DepthFloatingType,
  ownerId: string | undefined,
  baseVar: ComputedRef<string>,
  step: ComputedRef<number>,
): DepthFloatingLayer {
  const id = createDepthId(type)
  const activeOwnerId = ownerById(ownerId)?.id
  const layerRecord = { id, type, ownerId: activeOwnerId }
  floatingRecords.push(layerRecord)
  if (!activeOwnerId)
    rootRecords.push({ id, kind: 'floating' })

  const order = computed(() => Math.max(0, orderOfFloating(id, activeOwnerId)))
  const zIndex = computed(() => {
    const owner = ownerById(activeOwnerId)
    if (!owner)
      return zIndexAt(indexOfRootFloating(id), 0, baseVar.value, step.value)

    return addZIndexOffset(owner.floatingBaseZIndex.value, order.value)
  })

  return {
    id,
    type,
    ownerId: activeOwnerId,
    order,
    zIndex,
  }
}

function unregisterFloatingLayer(id: string) {
  const index = floatingRecords.findIndex(layer => layer.id === id)
  if (index !== -1)
    floatingRecords.splice(index, 1)

  const rootIndex = rootRecords.findIndex(layer => layer.id === id)
  if (rootIndex !== -1)
    rootRecords.splice(rootIndex, 1)
}

export function useTeleportedDepth(options: UseTeleportedDepthOptions) {
  const owner = inject(DEPTH_OWNER_KEY, undefined)
  const layer = shallowRef<DepthFloatingLayer>()
  const ownerId = computed(() => resolveActiveOwner(owner)?.id)
  const { baseVar, step } = useDepthTokens()

  function unregister() {
    if (!layer.value)
      return

    unregisterFloatingLayer(layer.value.id)
    layer.value = undefined
  }

  watch(
    () => [toValue(options.active), ownerId.value] as const,
    ([active, activeOwnerId]) => {
      if (layer.value && layer.value.ownerId !== activeOwnerId)
        unregister()

      if (active) {
        layer.value ??= registerFloatingLayer(options.type, activeOwnerId, baseVar, step)
        return
      }

      unregister()
    },
    { immediate: true },
  )

  onBeforeUnmount(unregister)

  return {
    layer,
    zIndex: computed(() => layer.value?.zIndex.value ?? toValue(options.fallbackZIndex)),
  }
}

export function useTeleportedDepthOwner(options: UseTeleportedDepthOwnerOptions) {
  const floating = useTeleportedDepth(options)
  const owner = useDepthOwner(options.type, {
    active: options.active,
    baseZIndex: floating.zIndex,
    root: false,
    contentOffset: 0,
    floatingOffset: 1,
  })

  provideDepthOwner(owner)

  return {
    ...floating,
    owner,
  }
}
