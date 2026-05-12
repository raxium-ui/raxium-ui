<script setup lang="ts">
import type { RatingGroupItemProps } from '.'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<RatingGroupItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvRatingGroup')
const indicatorClx = computed(() => crafts.value.itemIndicator(cxc(ui?.indicator)))
const iconClx = computed(() => crafts.value.itemIndicatorIcon(cxc(ui?.icon)))
</script>

<template>
  <RatingGroup.Item
    v-bind="forwarded"
    :class="crafts.item(cxc(ui?.root, propsClass))"
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
