<script setup lang="ts">
import type { UseDialogProps, UseDialogReturn } from '@ark-ui/vue/dialog'
import type { DialogEmits, DialogOpenChangeDetails, DialogProps } from '.'
import type {
  DialogInterceptContext,
  DialogTriggerFrom,
  FocusOutsideEvent,
  InteractOutsideEvent,
  OpenChangeDetails,
  PointerDownOutsideEvent,
  RequestDismissEvent,
} from './dialog-intercept-context'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Dialog, useDialog } from '@ark-ui/vue/dialog'
import { useConfig } from '@raxium/vue/composables/useConfig'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed, nextTick, ref, watch } from 'vue'
import { TriggerFrom } from './dialog-intercept-context'
import DialogInterceptProvider from './DialogInterceptProvider.vue'

type UseDialogPropsEx = UseDialogProps & {
  onOpenChange: (details: DialogOpenChangeDetails) => void
  onExitComplete: () => void
}

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  beforeClose,
  ...props
} = defineProps<DialogProps>()
const emits = defineEmits<DialogEmits>()
const dialogConfig = useConfig(
  'dialog',
  computed(() => ({ lazyMount, unmountOnExit })),
)
const forwarded = useForwardProps<DialogProps, UseDialogPropsEx>(props)

const triggerFrom = ref<DialogTriggerFrom>(undefined)
const dialogInterceptContext: DialogInterceptContext = { triggerFrom }

const beforeClosePending = ref(false)
const bypassBeforeClose = ref(false)

function emitOpenChange(details: OpenChangeDetails) {
  emits('openChange', { ...details, from: triggerFrom.value })
  emits('update:open', details.open)
  forwarded.value.onOpenChange?.({ ...details, from: triggerFrom.value })
}

const dialog = useDialog(
  computed(() => ({
    ...forwarded.value,
    onOpenChange: (details: OpenChangeDetails) => {
      if (!details.open && beforeClose && !bypassBeforeClose.value) {
        if (beforeClosePending.value) {
          dialog.value.setOpen(true)
          return
        }
        beforeClosePending.value = true
        dialog.value.setOpen(true)
        beforeClose({
          from: triggerFrom.value,
          done: () => {
            if (!beforeClosePending.value)
              return
            beforeClosePending.value = false
            bypassBeforeClose.value = true
            dialog.value.setOpen(false)
            nextTick(() => {
              bypassBeforeClose.value = false
            })
          },
        })
        return
      }
      emitOpenChange(details)
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
  })),
)

const initialized = ref(false)
watch(
  () => [forwarded.value.open, forwarded.value.defaultOpen],
  async ([open, defaultOpen]) => {
    if (!initialized.value) {
      initialized.value = true
      await nextTick()
      if (typeof open === 'undefined') {
        dialog.value.setOpen(!!defaultOpen)
      }
      else {
        dialog.value.setOpen(!!open)
      }
      return
    }
    if (typeof open !== 'undefined') {
      await nextTick()
      dialog.value.setOpen(!!open)
    }
  },
  { immediate: true },
)

// theme
const theme = useTheme(() => ({ ...dialogConfig.value?.theme, ...propsTheme }))

// expose
defineExpose({ $api: dialog as UseDialogReturn })
useForwardExpose()
</script>

<template>
  <Dialog.RootProvider
    :value="dialog"
    :lazy-mount="dialogConfig?.lazyMount ?? lazyMount"
    :unmount-on-exit="dialogConfig?.unmountOnExit ?? unmountOnExit"
    @exit-complete="
      () => {
        forwarded.onExitComplete?.()
        emits('exitComplete')
      }
    "
  >
    <DialogInterceptProvider :value="dialogInterceptContext">
      <ThemeProvider :value="theme">
        <slot />
      </ThemeProvider>
    </DialogInterceptProvider>
  </Dialog.RootProvider>
</template>
