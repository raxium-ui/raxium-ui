import type { DatePickerViewsState } from './props'
import { createContext, useContext } from 'react'

const defaultViewsState: DatePickerViewsState = {
  count: 1,
  hasDayView: true,
  hasMonthView: false,
  hasYearView: false,
}

export const DatePickerContentContext = createContext<DatePickerViewsState>(defaultViewsState)

export function useDatePickerContentContext() {
  return useContext(DatePickerContentContext)
}
