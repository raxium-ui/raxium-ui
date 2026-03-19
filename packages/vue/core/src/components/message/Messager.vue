<script setup lang="ts">
import type { MessageOptions, MessagerProps } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { defaults } from 'es-toolkit/compat'

const { theme: propsTheme, showClose = true, ...props } = defineProps<MessagerProps>()
// slots
defineSlots<{ default: (props: { message: MessageOptions<any> }) => any }>()

const messager = createToaster({
  ...props,
  placement: 'top',
})

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({
  messager,
})
</script>

<template>
  <Toaster
    v-slot="message"
    :toaster="messager"
  >
    <ThemeProvider :value="theme">
      <slot :message="defaults(message, { showClose })" />
    </ThemeProvider>
  </Toaster>
</template>
