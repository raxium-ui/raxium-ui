import type { DepthFloatingType, DepthOwnerType } from '@raxium/shared/depth'
import {
  addZIndexOffset,
  createDepthStore,
  DEFAULT_DEPTH_BASE_VAR,
  DEFAULT_DEPTH_STEP,
  zIndexAt,
} from '@raxium/shared/depth'
import type { ComputedRef, InjectionKey, MaybeRefOrGetter, ShallowRef } from 'vue'
import {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  shallowRef,
  toValue,
  watch,
} from 'vue'
import { useConfig } from './useConfig'

export type { DepthFloatingType, DepthOwnerType } from '@raxium/shared/depth'

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

/** Vue-package singleton store (stack state). */
const depthStore = createDepthStore()

/** Bumps when the shared stack mutates so Vue computeds re-run. */
const depthRevision = shallowRef(0)
depthStore.subscribe(() => {
  depthRevision.value += 1
})

const ownerInstances = new Map<string, DepthOwner>()

function trackDepth() {
  void depthRevision.value
}

function useDepthTokens(): { baseVar: ComputedRef<string>, step: ComputedRef<number> } {
  const config = useConfig('depth')
  const baseVar = computed(() => config.value?.baseZIndex ?? DEFAULT_DEPTH_BASE_VAR)
  const step = computed(() => config.value?.step ?? DEFAULT_DEPTH_STEP)
  return { baseVar, step }
}

function resolveActiveOwner(owner: DepthOwner | undefined): DepthOwner | undefined {
  if (!owner)
    return undefined

  trackDepth()
  if (owner.active.value && depthStore.hasOwner(owner.id))
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
  const id = depthStore.createId(type)
  const active = computed(() => toValue(options.active) ?? true)
  const parent = inject(DEPTH_OWNER_KEY, undefined)
  const root = computed(() => toValue(options.root) ?? !toValue(options.baseZIndex))
  const contentOffset = computed(() => toValue(options.contentOffset) ?? (type === 'dialog' ? 1 : 0))
  const floatingOffset = computed(() => toValue(options.floatingOffset) ?? (type === 'dialog' ? 2 : 1))
  const { baseVar, step } = useDepthTokens()

  function registerOwner() {
    depthStore.registerOwner(id, type, root.value)
  }

  function unregisterOwner() {
    depthStore.unregisterOwner(id)
  }

  const index = computed(() => {
    trackDepth()
    return Math.max(0, depthStore.indexOfOwner(id))
  })
  const baseZIndex = computed(() =>
    toValue(options.baseZIndex) ?? zIndexAt(index.value, 0, baseVar.value, step.value),
  )

  function bringToFront() {
    depthStore.bringOwnerToFront(id)
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
    depthStore.unregisterFloatingsByOwner(id)
  })

  return owner
}

function registerFloatingLayer(
  type: DepthFloatingType,
  ownerId: string | undefined,
  baseVar: ComputedRef<string>,
  step: ComputedRef<number>,
): DepthFloatingLayer {
  const id = depthStore.createId(type)
  const registered = depthStore.registerFloating(id, type, ownerId)
  const activeOwnerId = registered.ownerId

  const order = computed(() => {
    trackDepth()
    return Math.max(0, depthStore.orderOfFloating(id, activeOwnerId))
  })
  const zIndex = computed(() => {
    trackDepth()
    const owner = activeOwnerId ? ownerInstances.get(activeOwnerId) : undefined
    if (owner && depthStore.hasOwner(activeOwnerId!))
      return addZIndexOffset(owner.floatingBaseZIndex.value, order.value)

    const rootIndex = depthStore.indexOfRootFloating(id)
    if (rootIndex >= 0)
      return zIndexAt(rootIndex, 0, baseVar.value, step.value)

    // Owned floating whose owner left the stack (briefly before unregister):
    // do not clamp a missing root index to 0 (that collapses every orphan onto
    // the first band). Degrade to base + in-owner order until cleanup runs.
    return zIndexAt(0, Math.max(0, order.value), baseVar.value, step.value)
  })

  return {
    id,
    type,
    ownerId: activeOwnerId,
    order,
    zIndex,
  }
}

export function useTeleportedDepth(options: UseTeleportedDepthOptions) {
  const owner = inject(DEPTH_OWNER_KEY, undefined)
  const layer: ShallowRef<DepthFloatingLayer | undefined> = shallowRef()
  const ownerId = computed(() => resolveActiveOwner(owner)?.id)
  const { baseVar, step } = useDepthTokens()

  function unregister() {
    if (!layer.value)
      return

    depthStore.unregisterFloating(layer.value.id)
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
