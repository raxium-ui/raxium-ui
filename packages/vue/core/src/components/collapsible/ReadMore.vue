<script setup lang="ts">
import type { ReadMoreProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { rem2px } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
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
const crafts = useCraft(theme, 'tvReadMore', undefined, () => craft)

const triggerClassName = computed(() => {
  return crafts.value.trigger(cxc(ui?.trigger))
})
</script>

<template>
  <Collapsible
    v-slot="{ open }"
    v-bind="forwarded"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <CollapsibleContent :class="crafts.content(cxc(ui?.content))">
      <div ref="content-measure">
        <slot />
      </div>
    </CollapsibleContent>
    <slot
      name="trigger"
      v-bind="{ show: isShowTrigger, open, text, className: triggerClassName }"
    >
      <CollapsibleTrigger
        v-if="isShowTrigger"
        :class="triggerClassName"
      >
        {{ open ? text.less : text.more }}
      </CollapsibleTrigger>
    </slot>
  </Collapsible>
</template>
