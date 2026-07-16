<script setup lang="ts">
import type { DrawerCloseTriggerProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { useDrawerContext } from '@ark-ui/vue/drawer'
import { ark } from '@ark-ui/vue/factory'
import { computed } from 'vue'
import {
  injectDrawerInterceptContext,
  TriggerFrom,
} from './drawer-intercept-context'

const {
  from = TriggerFrom.CLOSE_TRIGGER,
  asChild,
  ...props
} = defineProps<DrawerCloseTriggerProps>()
const forwarded = useForwardProps<DrawerCloseTriggerProps, any>(props)
const context = useDrawerContext()
const interceptContext = injectDrawerInterceptContext()
const triggerProps = computed(() => {
  const contextProps = context.value.getCloseTriggerProps()
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
