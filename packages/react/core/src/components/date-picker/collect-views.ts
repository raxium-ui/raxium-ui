import type { DatePickerViewsState } from './props'
import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'

function typeName(type: unknown): string | undefined {
  if (typeof type === 'function' || (typeof type === 'object' && type != null))
    return (type as { displayName?: string }).displayName
  return undefined
}

export function collectDatePickerViews(children: ReactNode): DatePickerViewsState {
  const state: DatePickerViewsState = {
    count: 0,
    hasDayView: false,
    hasMonthView: false,
    hasYearView: false,
  }

  function walk(node: ReactNode) {
    Children.forEach(node, (child) => {
      if (!isValidElement(child))
        return
      if (child.type === Fragment) {
        walk((child.props as { children?: ReactNode }).children)
        return
      }
      const name = typeName(child.type)
      switch (name) {
        case 'DatePicker.DayView':
          state.hasDayView = true
          break
        case 'DatePicker.MonthView':
          state.hasMonthView = true
          break
        case 'DatePicker.YearView':
          state.hasYearView = true
          break
        default:
          break
      }
    })
  }

  walk(children)
  state.count = Number(state.hasDayView) + Number(state.hasMonthView) + Number(state.hasYearView)
  if (state.count === 0)
    return { count: 1, hasDayView: true, hasMonthView: false, hasYearView: false }
  return state
}
