import type {
  DatePickerContentBaseProps,
  DatePickerControlBaseProps,
  DatePickerRootBaseProps,
} from '@ark-ui/react/date-picker'
import type { ThemeCrafts, ThemeNoCrafts } from '@raxium/react/providers/theme'
import type { HTMLAttributes, ReactNode } from 'react'

type ClassName = HTMLAttributes<HTMLElement>['className']

export interface DatePickerViewsState {
  count: number
  hasDayView: boolean
  hasMonthView: boolean
  hasYearView: boolean
}

export interface DatePickerProps extends DatePickerRootBaseProps, ThemeCrafts<'tvDatePicker'> {
  className?: ClassName
  children?: ReactNode
}

export interface DatePickerControlProps extends DatePickerControlBaseProps, ThemeNoCrafts {
  className?: ClassName
  children?: ReactNode
}

export interface DatePickerContentProps extends DatePickerContentBaseProps, ThemeNoCrafts {
  className?: ClassName
  prefix?: ReactNode
  suffix?: ReactNode
  children?: ReactNode
}

export interface DatePickerDayViewProps extends ThemeNoCrafts {
  className?: ClassName
  weekDayType?: 'short' | 'long' | 'narrow'
}

export interface DatePickerMonthViewProps extends ThemeNoCrafts {
  className?: ClassName
  monthType?: 'short' | 'long'
}

export interface DatePickerYearViewProps extends ThemeNoCrafts {
  className?: ClassName
}
