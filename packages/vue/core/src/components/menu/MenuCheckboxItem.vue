<script setup lang="ts">
import type { MenuCheckboxItemEmits, UseMenuItemContext } from '@ark-ui/vue/menu'
import type { UnwrapRef } from 'vue'
import type { MenuCheckboxItemProps } from '.'
import { Menu, MenuItemIndicator } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<MenuCheckboxItemProps>()
const emit = defineEmits<MenuCheckboxItemEmits>()
defineSlots<{
  default: (props: UnwrapRef<UseMenuItemContext>) => any
  indicator: (props: UnwrapRef<UseMenuItemContext>) => any
}>()
const forwarded = useForwardPropsEmits(props, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
const checkboxCrafts = computed(() => theme.value.crafts.tvCheckbox())
</script>

<template>
  <Menu.CheckboxItem
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <Menu.ItemContext v-slot="context">
      <slot
        name="indicator"
        v-bind="context"
      >
        <span
          :class="checkboxCrafts.control({ class: clsx(ui?.checkbox), ...theme })"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-disabled="context.disabled ? '' : undefined"
          aria-hidden="true"
        >
          <MenuItemIndicator :class="checkboxCrafts.indicator({ ...theme })">
            <Check :class="checkboxCrafts.indicatorChecked({ ...theme })" />
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
