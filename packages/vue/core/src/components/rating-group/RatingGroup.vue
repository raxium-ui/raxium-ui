<script setup lang="ts">
import type { RatingGroupRootEmits } from '@ark-ui/vue/rating-group'
import type { RatingGroupProps } from '.'
import { RatingGroup, useRatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'

const { class: propsClass, theme: propsTheme, craft, ui, ...props } = defineProps<RatingGroupProps>()
const emit = defineEmits<RatingGroupRootEmits>()
const ratingGroup = useRatingGroup(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const crafts = useCraft(theme, 'tvRatingGroup')

// expose
defineExpose({ $api: ratingGroup })
useForwardExpose()
</script>

<template>
  <RatingGroup.RootProvider
    :value="ratingGroup"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >      <slot name="prefix" />
      <RatingGroup.Control :class="crafts.control(cxc(ui?.control))">
        <slot :items="ratingGroup.items" />
      </RatingGroup.Control>
      <slot name="suffix" />  </RatingGroup.RootProvider>
</template>
