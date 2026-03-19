import type { TagsInputItemBaseProps, TagsInputRootBaseProps } from '@ark-ui/vue'
import type { TagsInputVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/vue/providers'
import type { ComputedRef, HTMLAttributes } from 'vue'

export const TAGS_INPUT_PROVIDE_KEY = Symbol('TagsInputProvideKey')
export type TagsInputProvide = {
  inline: ComputedRef<boolean>
}

export interface TagsInputProps extends TagsInputRootBaseProps, ThemeCrafts<'tvTagsInput' | 'tvInput'> {
  class?: HTMLAttributes['class']
  inline?: TagsInputVariants['inline']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
  }
}

export interface TagsInputItemProps extends TagsInputItemBaseProps, ThemeNoCrafts {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    preview?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
}
