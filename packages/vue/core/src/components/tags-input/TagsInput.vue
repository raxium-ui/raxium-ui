<script setup lang="ts">
import type { TagsInputRootEmits } from '@ark-ui/vue/tags-input'
import type { TagsInputProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useTheme } from '@raxium/vue/composables'
import { useProvideComponentTheme } from '@raxium/vue/composables/useProvideComponentTheme'
import { computed, nextTick, provide, useTemplateRef, watch } from 'vue'
import { TAGS_INPUT_PROVIDE_KEY } from '.'
import { ScrollArea, ScrollAreaScrollbar } from '../scroll-area'

const {
  class: propsClass,
  theme: propsTheme,
  craft,
  inline = true,
  ui,
  ...props
} = defineProps<TagsInputProps>()
const emits = defineEmits<TagsInputRootEmits>()
const forwarded = useForwardProps(props)
const tagsInput = useTagsInput(forwarded, emits)

const scrollAreaRef = useTemplateRef('scrollArea')
watch(
  () => tagsInput.value.value,
  (newValue, oldValue) => {
    nextTick(() => {
      if (newValue.length > oldValue.length) {
        // add items
        scrollAreaRef.value?.$el.querySelector('[data-part="viewport"]')?.scrollTo({
          left: 9999,
          behavior: 'smooth',
        })
      }
    })
  },
)

// theme
const theme = useTheme(() => propsTheme, undefined, () => craft)
useProvideComponentTheme(theme, () => propsTheme)
const inputCrafts = useCraft(theme, 'tvInput')
const crafts = useCraft(theme, 'tvTagsInput', () => ({
  inline,
  empty: tagsInput.value.value.length === 0,
}))

// provide
provide(TAGS_INPUT_PROVIDE_KEY, {
  inline: computed(() => inline),
})

// expose
defineExpose({ $api: tagsInput })
useForwardExpose()
</script>

<template>
  <TagsInput.RootProvider
    :value="tagsInput"
    :class="crafts.root(cxc(ui?.root, propsClass))"
  >
    <slot name="prefix" />
    <TagsInput.Control :class="inputCrafts.root(cxc(crafts.control(), ui?.control))">
      <ScrollArea
        v-if="inline"
        ref="scrollArea"
        :class="crafts.scrollArea()"
        :ui="{ content: crafts.scrollAreaContent() }"
      >
        <slot :items="tagsInput.value" />
        <ScrollAreaScrollbar
          orientation="horizontal"
          :theme="{ size: theme.size === 'sm' ? 'xs' : 'sm' }"
        />
      </ScrollArea>
      <slot
        v-else
        :items="tagsInput.value"
      />
      <TagsInput.Input :class="inputCrafts.input(cxc(crafts.input(), ui?.input))" />
    </TagsInput.Control>
    <slot name="suffix" />    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>
</template>
