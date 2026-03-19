<script setup lang="ts">
import type { RatingGroupRootEmits } from '@ark-ui/vue/rating-group'
import type { RatingGroupProps } from '.'
import { RatingGroup, useRatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<RatingGroupProps>()
const emit = defineEmits<RatingGroupRootEmits>()
const ratingGroup = useRatingGroup(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvRatingGroup())

// expose
defineExpose({ $api: ratingGroup })
useForwardExpose()
</script>

<template>
  <RatingGroup.RootProvider
    :value="ratingGroup"
    :class="crafts.root({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <RatingGroup.Control :class="crafts.control({ class: clsx(ui?.control), ...theme })">
        <slot :items="ratingGroup.items" />
      </RatingGroup.Control>
      <slot name="suffix" />
    </ThemeProvider>
  </RatingGroup.RootProvider>
</template>
