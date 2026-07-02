<script setup lang="ts">
import type { UseMenuItemContext } from '@ark-ui/vue/menu'
import type { UnwrapRef } from 'vue'
import type { MenuRadioItemProps } from '.'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Check, Circle } from '@lucide/vue'
import { cn, cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'

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
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvMenu')
const radioCrafts = useCraft(theme, 'tvRadioGroup', () => ({ variant }))
</script>

<template>
  <Menu.RadioItem
    v-bind="forwarded"
    :class="cn(crafts.item(), crafts.radioItem(cxc(ui?.root, propsClass)))"
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
        <span :class="crafts.itemIndicator(cxc(ui?.indicator))">
          <Circle
            v-if="variant === 'default'"
            :class="radioCrafts.itemIndicator()"
            data-part="indicator"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
          <Check
            v-if="variant === 'checkbox'"
            :class="radioCrafts.itemIndicator()"
            data-part="indicator"
            :data-state="context.checked ? 'checked' : 'unchecked'"
            :data-variant="variant"
            :hidden="context.checked ? undefined : true"
          />
        </span>
      </slot>
    </Menu.ItemContext>
  </Menu.RadioItem>
</template>
