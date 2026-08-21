import type { DatePickerDayViewProps } from './props'
import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react/date-picker'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import { useDatePickerContentContext } from './date-picker-content-context'

function weekDayLabel(
  weekDay: { short: string, long: string, narrow: string },
  type: NonNullable<DatePickerDayViewProps['weekDayType']>,
) {
  switch (type) {
    case 'short':
      return weekDay.short
    case 'long':
      return weekDay.long
    case 'narrow':
      return weekDay.narrow
    default: {
      const _exhaustive: never = type
      return _exhaustive
    }
  }
}

export const DatePickerDayView = forwardRef<HTMLDivElement, DatePickerDayViewProps>(
  ({ className, theme: propsTheme, weekDayType = 'short' }, ref) => {
    const viewsState = useDatePickerContentContext()
    const context = useDatePickerContext()
    const theme = useInheritedTheme(propsTheme)
    const viewVariants = useMemo(() => ({ view: 'day' as const }), [])
    const crafts = useCraft(theme, 'tvDatePickerView', viewVariants)

    return (
      <ArkDatePicker.View ref={ref} view="day" className={crafts.view(cxc(className))}>
        <ArkDatePicker.ViewControl className={crafts.viewControl()}>
          <ArkDatePicker.PrevTrigger asChild className={crafts.viewControlTrigger()}>
            <ChevronLeft />
          </ArkDatePicker.PrevTrigger>
          {viewsState.count > 1 && viewsState.hasMonthView
            ? (
                <ArkDatePicker.ViewTrigger className={crafts.viewTrigger()}>
                  <ArkDatePicker.RangeText />
                </ArkDatePicker.ViewTrigger>
              )
            : <ArkDatePicker.RangeText />}
          <ArkDatePicker.NextTrigger asChild className={crafts.viewControlTrigger()}>
            <ChevronRight />
          </ArkDatePicker.NextTrigger>
        </ArkDatePicker.ViewControl>
        <ArkDatePicker.Table className={crafts.table()}>
          <div {...context.getTableHeadProps()} className={crafts.tableHead()}>
            {context.weekDays.map((weekDay, id) => (
              <div
                key={id}
                {...context.getTableHeaderProps()}
                className={crafts.tableHeader()}
              >
                {weekDayLabel(weekDay, weekDayType)}
              </div>
            ))}
          </div>
          <div {...context.getTableBodyProps()} className={crafts.tableBody()}>
            {flatten(context.weeks).map((day, did) => (
              <ArkDatePicker.TableCell key={did} value={day} className={crafts.tableCell()}>
                <ArkDatePicker.TableCellTrigger
                  className={crafts.tableCellTrigger(context.getDayTableCellState({ value: day }))}
                >
                  {day.day}
                </ArkDatePicker.TableCellTrigger>
              </ArkDatePicker.TableCell>
            ))}
          </div>
        </ArkDatePicker.Table>
      </ArkDatePicker.View>
    )
  },
)

DatePickerDayView.displayName = 'DatePicker.DayView'
