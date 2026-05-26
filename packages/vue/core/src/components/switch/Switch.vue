<script setup lang="ts">
import type { SwitchRootEmits } from '@ark-ui/vue'
import type { SwitchProps } from '.'
import { Switch, useForwardExpose, useForwardProps, useSwitch } from '@ark-ui/vue'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ui, ...props } = defineProps<SwitchProps>()
const emit = defineEmits<SwitchRootEmits>()
const switchRoot = useSwitch(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvSwitch')

// expose
defineExpose({ $api: switchRoot })
useForwardExpose()
</script>

<template>
  <Switch.RootProvider
    :value="switchRoot"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >      <Switch.Control :class="crafts.control(cxc(ui?.control))">
        <Switch.Thumb :class="crafts.thumb(cxc(ui?.thumb))" />
      </Switch.Control>
      <Switch.HiddenInput />
      <slot />  </Switch.RootProvider>
</template>
