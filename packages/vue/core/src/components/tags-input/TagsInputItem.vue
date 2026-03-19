<script setup lang="ts">
import type { TagsInputItemProps, TagsInputProvide } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInputContext } from '@ark-ui/vue/tags-input'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
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
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvTagsInput())
const inputCrafts = computed(() => theme.value.crafts.tvInput())
</script>

<template>
  <TagsInput.Item
    v-bind="forwarded"
    :class="crafts.item({ class: clsx(ui?.root, propsClass), inline, ...theme })"
  >
    <TagsInput.ItemPreview
      ref="preview"
      :class="crafts.itemPreview({ class: clsx(ui?.preview), inline, ...theme })"
    >
      <TagsInput.ItemText :class="crafts.itemText({ class: clsx(ui?.text), inline, ...theme })">
        {{ value }}
      </TagsInput.ItemText>
      <slot />
    </TagsInput.ItemPreview>
    <TagsInput.ItemInput
      :class="
        inputCrafts.root({
          class: clsx(crafts.itemInput({ inline, ...theme }), ui?.input),
          ...theme,
        })
      "
    />
  </TagsInput.Item>
</template>
