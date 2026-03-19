<script setup lang="ts">
import type { DialogTriggerProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useDialogContext } from '@ark-ui/vue/dialog'
import { ark } from '@ark-ui/vue/factory'
import { computed } from 'vue'
import {
  injectDialogInterceptContext,
  TriggerFrom,
} from './dialog-intercept-context'

const {
  from = TriggerFrom.OPEN_TRIGGER,
  asChild,
  ...props
} = defineProps<DialogTriggerProps>()
const forwarded = useForwardProps<DialogTriggerProps, any>(props)

const context = useDialogContext()
const interceptContext = injectDialogInterceptContext()
const triggerProps = computed(() => {
  const contextProps = context.value.getTriggerProps()
  return Object.assign({}, contextProps, forwarded.value, {
    onClick: (e: PointerEvent) => {
      interceptContext.value.triggerFrom.value = from
      contextProps.onClick?.(e)
    },
  })
})

useForwardExpose()
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
