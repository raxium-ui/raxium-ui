<script setup lang="ts">
import type { SelectContentProps } from '.'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<SelectContentProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvSelect())
</script>

<template>
  <Select.Positioner>
    <Select.Content
      v-bind="forwarded"
      :class="crafts.content({ class: [ui?.root, propsClass], ...theme })"
    >
      <ark.div
        data-scope="select"
        data-part="content-inner"
        :class="crafts.contentInner({ class: [ui?.inner], ...theme })"
      >
        <slot />
      </ark.div>
    </Select.Content>
  </Select.Positioner>
</template>
