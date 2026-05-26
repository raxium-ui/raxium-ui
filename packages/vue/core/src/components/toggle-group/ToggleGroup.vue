<script setup lang="ts">
import type { ToggleGroupRootEmits } from '@ark-ui/vue/toggle-group'
import type { ToggleGroupProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroup } from '@ark-ui/vue/toggle-group'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ...props } = defineProps<ToggleGroupProps>()
const emit = defineEmits<ToggleGroupRootEmits>()
const forwarded = useForwardProps(props)
const toggleGroup = useToggleGroup(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvToggleGroup', () => ({
  orientation: forwarded.value.orientation ?? 'horizontal',
}))

// expose
defineExpose({ $api: toggleGroup })
useForwardExpose()
</script>

<template>
  <ToggleGroup.RootProvider
    :value="toggleGroup"
    :class="
      crafts.root(cxc(propsClass))
    "
  >
    <slot />
  </ToggleGroup.RootProvider>
</template>
