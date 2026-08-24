import type { ResolvedTheme, ThemeProps } from '@raxium/react/providers/theme'
import type { PaginationPageSizeProps } from './props'
import { usePaginationContext } from '@ark-ui/react/pagination'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { uniq } from 'es-toolkit'
import { useMemo } from 'react'
import { createListCollection, Select } from '../select'

function tokensFromTheme(theme: ResolvedTheme): ThemeProps {
  return {
    size: theme.size,
    skin: theme.skin,
    surface: theme.surface,
    unstyled: theme.unstyled,
    bordered: theme.bordered,
  }
}

export function PaginationPageSize({
  className,
  theme: propsTheme,
  sizes,
  placeholder,
  prefix,
  suffix,
  ui,
}: PaginationPageSizeProps) {
  const context = usePaginationContext()
  const theme = useInheritedTheme(propsTheme)
  const crafts = useCraft(theme, 'tvPaginationPageSize')
  const selectTheme = useMemo(() => tokensFromTheme(theme), [theme])
  const items = useMemo(() => {
    const list = uniq(sizes?.length ? sizes : [10, 20, 30, 50])
    return list.map(n => ({ label: String(n), value: String(n) }))
  }, [sizes])
  const collection = useMemo(() => createListCollection({ items }), [items])

  return (
    <div
      className={crafts.root(cxc(ui?.root, className))}
      data-scope="pagination"
      data-part="page-size"
    >
      {prefix}
      <Select
        collection={collection}
        theme={selectTheme}
        className={crafts.control(cxc(ui?.control))}
        value={[String(context.pageSize)]}
        onValueChange={(details) => {
          const next = Number(details.value[0])
          if (Number.isFinite(next))
            context.setPageSize(next)
        }}
      >
        <Select.Trigger className={crafts.trigger(cxc(ui?.trigger))}>
          <Select.Value className={crafts.value(cxc(ui?.value))} placeholder={placeholder ?? 'Page size'} />
        </Select.Trigger>
        <Select.Content className={crafts.content(cxc(ui?.content))}>
          {items.map(item => (
            <Select.Item
              key={item.value}
              item={item}
              className={crafts.item(cxc(ui?.item))}
              indicator={<></>}
            >
              {item.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
      {suffix}
    </div>
  )
}

PaginationPageSize.displayName = 'Pagination.PageSize'
