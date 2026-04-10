<script setup lang="ts">
import type { TagsInputRootEmits } from '@ark-ui/vue/tags-input'
import type { TagsInputProps } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { clsx } from '@raxium/themes/utils'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ThemeProvider } from '@raxium/vue/providers/theme'
import { computed, nextTick, provide, useTemplateRef, watch } from 'vue'
import { TAGS_INPUT_PROVIDE_KEY } from '.'
import { ScrollArea, ScrollAreaScrollbar } from '../scroll-area'

const {
  class: propsClass,
  theme: propsTheme,
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
const theme = useTheme(() => propsTheme)
const inputCrafts = computed(() => theme.value.crafts.tvInput())
const crafts = computed(() => theme.value.crafts.tvTagsInput())

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
    :class="crafts.root({ class: clsx(ui?.root, propsClass), inline, ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <TagsInput.Control
        :class="
          inputCrafts.root({
            class: clsx(crafts.control({ inline, ...theme }), ui?.control),
            ...theme,
          })
        "
      >
        <ScrollArea
          v-if="inline"
          ref="scrollArea"
          :class="crafts.scrollArea({ empty: tagsInput.value.length === 0, inline, ...theme })"
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
        <TagsInput.Input
          :class="
            inputCrafts.input({
              class: clsx(crafts.input({ inline, ...theme }), ui?.input),
              ...theme,
            })
          "
        />
      </TagsInput.Control>
      <slot name="suffix" />
    </ThemeProvider>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>
</template>
