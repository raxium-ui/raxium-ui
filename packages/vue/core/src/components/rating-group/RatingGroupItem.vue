<script setup lang="ts">
import type { RatingGroupItemProps } from '.'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<RatingGroupItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvRatingGroup())
const indicatorClx = computed(() => {
  return crafts.value.itemIndicator({ class: clsx(ui?.indicator), ...theme.value })
})
const iconClx = computed(() => {
  return crafts.value.itemIndicatorIcon({ class: clsx(ui?.icon), ...theme.value })
})
</script>

<template>
  <RatingGroup.Item
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(ui?.root, propsClass), ...theme })"
  >
    <RatingGroup.ItemContext v-slot="{ highlighted, half, checked }">
      <slot
        v-bind="{
          classes: {
            indicator: indicatorClx,
            icon: iconClx,
          },
          context: {
            highlighted,
            half,
            checked,
          },
          index: forwarded.index,
        }"
      >
        <span
          :class="indicatorClx"
          :data-highlighted="highlighted ? '' : undefined"
          :data-half="half ? '' : undefined"
        >
          <Star
            :class="iconClx"
            data-bg=""
          />
          <Star
            :class="iconClx"
            data-fg=""
          />
        </span>
      </slot>
    </RatingGroup.ItemContext>
  </RatingGroup.Item>
</template>
