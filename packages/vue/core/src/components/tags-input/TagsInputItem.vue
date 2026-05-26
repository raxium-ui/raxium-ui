<script setup lang="ts">
import type { TagsInputItemProps, TagsInputProvide } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInputContext } from '@ark-ui/vue/tags-input'
import { cxc } from '@raxium/themes/utils'
import { useCraft, useInheritedTheme } from '@raxium/vue/composables'
import { computed, inject, useTemplateRef, watchEffect } from 'vue'
import { TAGS_INPUT_PROVIDE_KEY } from '.'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<TagsInputItemProps>()
const { inline } = inject<TagsInputProvide>(TAGS_INPUT_PROVIDE_KEY, {
  inline: computed(() => true),
})
const forwarded = useForwardProps(props)
const context = useTagsInputContext()
const itemsState = computed(() => context.value.getItemState(forwarded.value))

const preview = useTemplateRef('preview')
watchEffect(
  () => {
    if (itemsState.value.highlighted) {
      preview.value?.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  },
  { flush: 'post' },
)

// theme
const theme = useInheritedTheme(() => propsTheme)
const crafts = useCraft(theme, 'tvTagsInput', () => ({ inline: inline.value }))
const inputCrafts = useCraft(theme, 'tvInput')
</script>

<template>
  <TagsInput.Item
    v-bind="forwarded"
    :class="crafts.item(cxc(ui?.root, propsClass))"
  >
    <TagsInput.ItemPreview
      ref="preview"
      :class="crafts.itemPreview(cxc(ui?.preview))"
    >
      <TagsInput.ItemText :class="crafts.itemText(cxc(ui?.text))">
        {{ value }}
      </TagsInput.ItemText>
      <slot />
    </TagsInput.ItemPreview>
    <TagsInput.ItemInput :class="inputCrafts.root(cxc(crafts.itemInput(), ui?.input))" />
  </TagsInput.Item>
</template>
