<script setup lang="ts">
import type { SwitchRootEmits } from '@ark-ui/vue'
import type { SwitchProps } from '.'
import { Switch, useForwardExpose, useForwardProps, useSwitch } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SwitchProps>()
const emit = defineEmits<SwitchRootEmits>()
const switchRoot = useSwitch(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSwitch())

// expose
defineExpose({ $api: switchRoot })
useForwardExpose()
</script>

<template>
  <Switch.RootProvider
    :value="switchRoot"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <Switch.Control :class="crafts.control({ class: clsx(ui?.control), ...theme })">
        <Switch.Thumb :class="crafts.thumb({ class: clsx(ui?.thumb), ...theme })" />
      </Switch.Control>
      <Switch.HiddenInput class="hidden" />
      <slot />
    </ThemeProvider>
  </Switch.RootProvider>
</template>
