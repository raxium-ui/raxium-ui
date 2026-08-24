import type { KeyboardEvent } from 'react'
import type { ResolvedTheme, ThemeProps } from '@raxium/react/providers/theme'
import type { PaginationGoToProps } from './props'
import { usePaginationContext } from '@ark-ui/react/pagination'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { useEffect, useMemo, useState } from 'react'
import { NumberInput } from '../number-input'
import { PaginationGoToProvider } from './pagination-goto-context'

function tokensFromTheme(theme: ResolvedTheme): ThemeProps {
  return {
    size: theme.size,
    skin: theme.skin,
    surface: theme.surface,
    unstyled: theme.unstyled,
    bordered: theme.bordered,
  }
}

export function PaginationGoTo({
  className,
  theme: propsTheme,
  ui,
  widget,
  prefix,
  suffix,
  children,
}: PaginationGoToProps) {
  const context = usePaginationContext()
  const theme = useInheritedTheme(propsTheme)
  const crafts = useCraft(theme, 'tvPaginationGoto')
  const [innerValue, setInnerValue] = useState(String(context.page))
  const inputTheme = useMemo(() => tokensFromTheme(theme), [theme])

  useEffect(() => {
    setInnerValue(String(context.page))
  }, [context.page])

  function clampPage(page: string | number) {
    const parsed = Number(page)
    if (!Number.isFinite(parsed))
      return 1
    return Math.min(Math.max(Math.trunc(parsed), 1), Math.max(1, context.totalPages ?? 1))
  }

  function goInputPage() {
    const page = clampPage(innerValue)
    setInnerValue(String(page))
    context.setPage(page)
  }

  function onRootKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter')
      return
    if (!(event.target instanceof HTMLInputElement))
      return
    event.preventDefault()
    goInputPage()
  }

  return (
    <PaginationGoToProvider value={{ goInputPage }}>
      <div
        className={crafts.root(cxc(ui?.root, className))}
        data-scope="pagination"
        data-part="goto"
        onKeyDown={onRootKeyDown}
      >
        {prefix}
        <NumberInput
          {...widget?.input}
          theme={inputTheme}
          className={crafts.input(cxc(widget?.input?.className, ui?.input))}
          min={1}
          max={context.totalPages}
          clampValueOnBlur
          value={innerValue}
          onValueChange={details => setInnerValue(details.value)}
        />
        {suffix}
        {children}
      </div>
    </PaginationGoToProvider>
  )
}

PaginationGoTo.displayName = 'Pagination.GoTo'
