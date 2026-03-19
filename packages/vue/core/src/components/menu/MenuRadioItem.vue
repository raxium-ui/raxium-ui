<script setup lang="ts">
import type { UseMenuItemContext } from '@ark-ui/vue/menu'
import type { UnwrapRef } from 'vue'
import type { MenuRadioItemProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cn } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Check, Circle } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  variant = 'default',
  ui,
  ...props
} = defineProps<MenuRadioItemProps>()
defineSlots<{
  default: (props: UnwrapRef<UseMenuItemContext>) => any
  indicator: (props: UnwrapRef<UseMenuItemContext>) => any
}>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvMenu())
const radioCrafts = computed(() => theme.value.crafts.tvRadioGroup())
</script>

<template>
  <Menu.RadioItem
    v-bind="forwarded"
    :class="
      cn(crafts.item({ ...theme }), crafts.radioItem({ class: [ui?.root, propsClass], ...theme }))
    "
  >
    <Menu.ItemContext v-slot="context">
      <slot
        name="default"
        v-bind="context"
      />
      <slot
        name="indicator"
        v-bind="context"
      >
        <Circle
          v-if="variant === 'default'"
          :class="radioCrafts.itemIndicator({ class: [ui?.indicator], variant, ...theme })"
          data-part="indicator"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-variant="variant"
          :hidden="context.checked ? undefined : true"
        />
        <Check
          v-if="variant === 'checkbox'"
          :class="radioCrafts.itemIndicator({ class: ui?.indicator, variant, ...theme })"
          data-part="indicator"
          :data-state="context.checked ? 'checked' : 'unchecked'"
          :data-variant="variant"
          :hidden="context.checked ? undefined : true"
        />
      </slot>
    </Menu.ItemContext>
  </Menu.RadioItem>
</template>
