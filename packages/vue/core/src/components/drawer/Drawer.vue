<script setup lang="ts">
import type { UseDrawerProps, UseDrawerReturn } from '@ark-ui/vue/drawer'
import type { ComputedRef } from 'vue'
import type { DrawerEmits, DrawerProps, DrawerSide } from '.'
import type {
  DrawerInterceptContext,
  DrawerTriggerFrom,
  FocusOutsideEvent,
  InteractOutsideEvent,
  OpenChangeDetails,
  PointerDownOutsideEvent,
  RequestDismissEvent,
} from './drawer-intercept-context'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Drawer, useDrawer } from '@ark-ui/vue/drawer'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useThemeCraft } from '@raxium/vue/composables/useThemeCraft'
import { computed, nextTick, ref } from 'vue'
import { TriggerFrom } from './drawer-intercept-context'
import { provideDrawerSide } from './drawer-side-context'
import DrawerInterceptProvider from './DrawerInterceptProvider.vue'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  craft,
  beforeClose,
  side: propsSide,
  swipeDirection: propsSwipeDirection,
  ...props
} = defineProps<DrawerProps>()

const emits = defineEmits<DrawerEmits>()

/** Logical Ark swipe dirs (`start`/`end` follow writing direction). */
const SIDE_TO_SWIPE = {
  right: 'end',
  left: 'start',
  top: 'up',
  bottom: 'down',
} as const satisfies Record<DrawerSide, NonNullable<UseDrawerProps['swipeDirection']>>

const drawerConfig = useConfig(
  'drawer',
  computed(() => ({
    lazyMount,
    unmountOnExit,
    side: propsSide,
  })),
)

const resolvedSide = computed<DrawerSide>(
  () => propsSide ?? drawerConfig.value?.side ?? 'right',
)

const forwarded = useForwardProps(props) as ComputedRef<
  UseDrawerProps & { onExitComplete?: () => void }
>
const triggerFrom = ref<DrawerTriggerFrom>(undefined)
const drawerInterceptContext: DrawerInterceptContext = { triggerFrom }

const beforeClosePending = ref(false)
const bypassBeforeClose = ref(false)

function emitOpenChange(details: OpenChangeDetails) {
  emits('openChange', { ...details, from: triggerFrom.value })
  emits('update:open', details.open)
  forwarded.value.onOpenChange?.({
    ...details,
    from: triggerFrom.value,
  } as OpenChangeDetails)
}

// Ark `MaybeRef` typing can require WritableComputedRef; ComputedRef is fine at runtime.
const drawer = useDrawer(
  computed((): UseDrawerProps => ({
    ...forwarded.value,
    swipeDirection:
      propsSwipeDirection
      ?? SIDE_TO_SWIPE[resolvedSide.value],
    onOpenChange: (details: OpenChangeDetails) => {
      if (!details.open && beforeClose && !bypassBeforeClose.value) {
        if (beforeClosePending.value) {
          drawer.value.setOpen(true)
          return
        }
        beforeClosePending.value = true
        drawer.value.setOpen(true)
        beforeClose({
          from: triggerFrom.value,
          resume: resumeBeforeClose,
          done: (autoClose = true) => {
            if (!beforeClosePending.value)
              return
            if (!autoClose) {
              resumeBeforeClose()
              return
            }
            beforeClosePending.value = false
            bypassBeforeClose.value = true
            drawer.value.setOpen(false)
            nextTick(() => {
              bypassBeforeClose.value = false
            })
          },
        })
        return
      }
      if (!details.open && triggerFrom.value == null)
        triggerFrom.value = TriggerFrom.SWIPE
      !beforeClosePending.value && emitOpenChange(details)
    },
    onEscapeKeyDown: (event: KeyboardEvent) => {
      triggerFrom.value = TriggerFrom.ESCAPE
      emits('escapeKeyDown', event)
      forwarded.value.onEscapeKeyDown?.(event)
    },
    onFocusOutside: (event: FocusOutsideEvent) => {
      emits('focusOutside', event)
      forwarded.value.onFocusOutside?.(event)
    },
    onInteractOutside: (event: InteractOutsideEvent) => {
      triggerFrom.value = TriggerFrom.OUTSIDE
      emits('interactOutside', event)
      forwarded.value.onInteractOutside?.(event)
    },
    onPointerDownOutside: (event: PointerDownOutsideEvent) => {
      emits('pointerDownOutside', event)
      forwarded.value.onPointerDownOutside?.(event)
    },
    onRequestDismiss: (event: RequestDismissEvent) => {
      emits('requestDismiss', event)
      forwarded.value.onRequestDismiss?.(event)
    },
    onSnapPointChange: (details) => {
      emits('snapPointChange', details)
      forwarded.value.onSnapPointChange?.(details)
    },
    onTriggerValueChange: (details) => {
      emits('triggerValueChange', details)
      forwarded.value.onTriggerValueChange?.(details)
    },
  })) as never,
)

function resumeBeforeClose() {
  if (!beforeClosePending.value)
    return
  beforeClosePending.value = false
  bypassBeforeClose.value = false
  drawer.value.setOpen(true)
}

provideDrawerSide(resolvedSide)

// theme
const theme = useTheme(
  () => propsTheme,
  () => drawerConfig.value?.theme,
)
const themed = useThemeCraft(theme, 'tvDrawer', () => craft)
useProvideComponentTheme(themed, () => propsTheme)

const drawerApi = computed(() => ({
  ...drawer.value,
  resumeBeforeClose,
}))
defineExpose({ $api: drawerApi as UseDrawerReturn })
useForwardExpose()
</script>

<template>
  <Drawer.RootProvider
    :value="drawer"
    :lazy-mount="drawerConfig?.lazyMount ?? lazyMount"
    :unmount-on-exit="drawerConfig?.unmountOnExit ?? unmountOnExit"
    @exit-complete="
      () => {
        forwarded.onExitComplete?.()
        emits('exitComplete')
      }
    "
  >
    <DrawerInterceptProvider :value="drawerInterceptContext">
      <slot />
    </DrawerInterceptProvider>
  </Drawer.RootProvider>
</template>
