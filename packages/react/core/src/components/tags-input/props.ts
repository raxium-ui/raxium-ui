import type {
  TagsInputItemBaseProps,
  TagsInputRootBaseProps,
} from '@ark-ui/react/tags-input'
import type { TagsInputVariants } from '@raxium/themes/default'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface TagsInputProps extends TagsInputRootBaseProps, ThemeCrafts<'tvTagsInput'> {
  className?: ClassName
  inline?: TagsInputVariants['inline']
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    input?: ClassName
  }
  children?: ReactNode
}

export interface TagsInputItemProps extends TagsInputItemBaseProps, ThemeNoCrafts {
  className?: ClassName
  ui?: {
    root?: ClassName
    preview?: ClassName
    input?: ClassName
    text?: ClassName
  }
  children?: ReactNode
}
