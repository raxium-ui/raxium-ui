<script setup lang="ts">
import type { CreateToasterProps } from '@ark-ui/vue/toast'
import type { RaxiumToaster, ToasterProps, ToastOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { useTheme } from '@raxium/vue/composables/useTheme'

const { toasterId, theme: propsTheme, ...props } = defineProps<ToasterProps>()
// slots
defineSlots<{
  default: (props: { toast: ToastOptions<any> }) => any
}>()

const toaster = createToaster(props as CreateToasterProps)

// theme
const theme = useTheme(() => propsTheme)
useProvideComponentTheme(theme, () => propsTheme)

// expose
defineExpose({
  toasterId,
  toaster: toaster as RaxiumToaster,
})
</script>

<template>
  <Toaster
    v-slot="toast"
    :toaster="toaster"
  >
    <slot :toast="toast" />
  </Toaster>
</template>
