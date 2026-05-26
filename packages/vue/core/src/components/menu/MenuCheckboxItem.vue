<script setup lang="ts">
import type { MenuCheckboxItemEmits, UseMenuItemContext } from '@ark-ui/vue/menu'
import type { UnwrapRef } from 'vue'
import type { MenuCheckboxItemProps } from '.'
import { Menu, MenuItemIndicator } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { Check } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<MenuCheckboxItemProps>()
const emit = defineEmits<MenuCheckboxItemEmits>()
defineSlots<{
  default: (props: UnwrapRef<UseMenuItemContext>) => any
  indicator: (props: UnwrapRef<UseMenuItemContext>) => any
}>()
const forwarded = useForwardPropsEmits(props, emit)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvMenu')
const checkboxCrafts = useCraft(theme, 'tvCheckbox')
</script>

<template>
  <Menu.CheckboxItem
    v-bind="forwarded"
    :class="crafts.item(cxc(ui?.root, propsClass))"
  >
    <Menu.ItemContext v-slot="context">
      <slot
        name="indicator"
        v-bind="context"
      >
        <span
          :class="checkboxCrafts.control(cxc(ui?.checkbox))"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-disabled="context.disabled ? '' : undefined"
          aria-hidden="true"
        >
          <MenuItemIndicator :class="checkboxCrafts.indicator()">
            <Check :class="checkboxCrafts.indicatorChecked()" />
          </MenuItemIndicator>
        </span>
      </slot>
      <slot
        name="default"
        v-bind="context"
      />
    </Menu.ItemContext>
  </Menu.CheckboxItem>
</template>
