import type { DatePickerYearViewProps } from './props'
import { DatePicker as ArkDatePicker, useDatePickerContext } from '@ark-ui/react/date-picker'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { flatten } from 'es-toolkit'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'

export const DatePickerYearView = forwardRef<HTMLDivElement, DatePickerYearViewProps>(
  ({ className, theme: propsTheme }, ref) => {
    const context = useDatePickerContext()
    const theme = useInheritedTheme(propsTheme)
    const viewVariants = useMemo(() => ({ view: 'year' as const }), [])
    const crafts = useCraft(theme, 'tvDatePickerView', viewVariants)

    return (
      <ArkDatePicker.View ref={ref} view="year" className={crafts.view(cxc(className))}>
        <ArkDatePicker.ViewControl className={crafts.viewControl()}>
          <ArkDatePicker.PrevTrigger asChild className={crafts.viewControlTrigger()}>
            <ChevronLeft />
          </ArkDatePicker.PrevTrigger>
          <ArkDatePicker.RangeText />
          <ArkDatePicker.NextTrigger asChild className={crafts.viewControlTrigger()}>
            <ChevronRight />
          </ArkDatePicker.NextTrigger>
        </ArkDatePicker.ViewControl>
        <ArkDatePicker.Table className={crafts.table()}>
          <div {...context.getTableBodyProps()} className={crafts.tableBody()}>
            {flatten(context.getYearsGrid({ columns: 4 })).map((year, yid) => (
              <ArkDatePicker.TableCell
                key={`year-${yid}`}
                value={year.value}
                className={crafts.tableCell()}
              >
                <ArkDatePicker.TableCellTrigger
                  className={crafts.tableCellTrigger(context.getYearTableCellState({ value: year.value }))}
                >
                  {year.label}
                </ArkDatePicker.TableCellTrigger>
              </ArkDatePicker.TableCell>
            ))}
          </div>
        </ArkDatePicker.Table>
      </ArkDatePicker.View>
    )
  },
)

DatePickerYearView.displayName = 'DatePicker.YearView'
