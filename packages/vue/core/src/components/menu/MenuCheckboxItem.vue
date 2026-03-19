<script setup lang="ts">
import type { MenuCheckboxItemEmits } from '@ark-ui/vue/menu'
import type { MenuCheckboxItemProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { Checkbox } from '@raxium/vue/components/checkbox'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<MenuCheckboxItemProps>()
const emit = defineEmits<MenuCheckboxItemEmits>()
defineSlots<{
  default: (props: { checked: boolean }) => any
  indicator: (props: { checked: boolean }) => any
}>()
const forwarded = useForwardPropsEmits(props, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
</script>

<template>
  <Menu.CheckboxItem
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <slot
      name="indicator"
      v-bind="{ checked: forwarded.checked }"
    >
      <Checkbox
        :class="clsx(ui?.checkbox)"
        :checked="forwarded.checked"
        :theme="theme"
      />
    </slot>
    <slot
      name="default"
      v-bind="{ checked: forwarded.checked }"
    />
  </Menu.CheckboxItem>
</template>
