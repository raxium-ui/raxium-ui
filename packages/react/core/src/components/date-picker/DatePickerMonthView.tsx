import type { DatePickerMonthViewProps } from './props'
import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react/date-picker'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'
import { useDatePickerContentContext } from './date-picker-content-context'

export const DatePickerMonthView = forwardRef<HTMLDivElement, DatePickerMonthViewProps>(
  ({ className, theme: propsTheme, monthType = 'short' }, ref) => {
    const viewsState = useDatePickerContentContext()
    const context = useDatePickerContext()
    const theme = useInheritedTheme(propsTheme)
    const viewVariants = useMemo(() => ({ view: 'month' as const }), [])
    const crafts = useCraft(theme, 'tvDatePickerView', viewVariants)

    return (
      <ArkDatePicker.View ref={ref} view="month" className={crafts.view(cxc(className))}>
        <ArkDatePicker.ViewControl className={crafts.viewControl()}>
          <ArkDatePicker.PrevTrigger asChild className={crafts.viewControlTrigger()}>
            <ChevronLeft />
          </ArkDatePicker.PrevTrigger>
          {viewsState.count > 1 && viewsState.hasYearView
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
          <div {...context.getTableBodyProps()} className={crafts.tableBody()}>
            {context.getMonths({ format: monthType }).map((month, mid) => (
              <ArkDatePicker.TableCell key={mid} value={month.value} className={crafts.tableCell()}>
                <ArkDatePicker.TableCellTrigger
                  className={crafts.tableCellTrigger(context.getMonthTableCellState({ value: month.value }))}
                >
                  {month.label}
                </ArkDatePicker.TableCellTrigger>
              </ArkDatePicker.TableCell>
            ))}
          </div>
        </ArkDatePicker.Table>
      </ArkDatePicker.View>
    )
  },
)

DatePickerMonthView.displayName = 'DatePicker.MonthView'
