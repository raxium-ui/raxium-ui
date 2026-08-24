import type { PaginationRootBaseProps } from '@ark-ui/react/pagination'
import type { PolymorphicProps } from '@ark-ui/react/factory'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'
import type { NumberInputProps } from '../number-input/props'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface PaginationProps extends PaginationRootBaseProps, ThemeCrafts<'tvPagination'> {
  className?: ClassName
  ui?: {
    root?: ClassName
    control?: ClassName
    firstPage?: ClassName
    prevPage?: ClassName
    nextPage?: ClassName
    lastPage?: ClassName
    item?: ClassName
    ellipsis?: ClassName
  }
  dynamicPageEnd?: number
  children?: ReactNode
}

export interface PaginationGoToProps extends ThemeNoCrafts {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    input?: ClassName
  }
  widget?: {
    input?: NumberInputProps
  }
  children?: ReactNode
}

export interface PaginationGoToTriggerProps extends PolymorphicProps {
  className?: ClassName
  children?: ReactNode
}

export interface PaginationPageSizeProps extends ThemeNoCrafts {
  className?: ClassName
  sizes?: number[]
  placeholder?: string
  prefix?: ReactNode
  suffix?: ReactNode
  ui?: {
    root?: ClassName
    control?: ClassName
    trigger?: ClassName
    value?: ClassName
    content?: ClassName
    item?: ClassName
  }
}
