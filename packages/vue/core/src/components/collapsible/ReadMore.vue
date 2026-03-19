<script setup lang="ts">
import type { ReadMoreProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { rem2px } from '@raxium/shared/css'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  text = {
    more: 'View More',
    less: 'View Less',
  },
  ...props
} = defineProps<ReadMoreProps>()
const forwarded = useForwardProps(props)

const contentMeasureRef = useTemplateRef('content-measure')
const { height: measuredHeight } = useElementSize(contentMeasureRef)

const isShowTrigger = computed(() => {
  let collapsedHeight = forwarded.value.collapsedHeight as number
  if (typeof forwarded.value.collapsedHeight === 'string') {
    collapsedHeight = rem2px(forwarded.value.collapsedHeight)
  }
  return measuredHeight.value > collapsedHeight
})

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvReadMore())
</script>

<template>
  <Collapsible
    v-slot="{ open }"
    v-bind="forwarded"
    :class="crafts.root({ class: [ui?.root, propsClass], ...theme })"
  >
    <CollapsibleContent :class="crafts.content({ class: [ui?.content], ...theme })">
      <div ref="content-measure">
        <slot />
      </div>
    </CollapsibleContent>
    <CollapsibleTrigger
      v-if="isShowTrigger"
      :class="crafts.trigger({ class: [ui?.trigger], ...theme })"
    >
      <div>{{ open ? text.less : text.more }}</div>
    </CollapsibleTrigger>
  </Collapsible>
</template>
