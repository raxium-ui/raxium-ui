import type { PaginationProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { Pagination as ArkPagination, usePaginationContext } from '@ark-ui/react/pagination'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { forwardRef, useMemo } from 'react'

function PaginationControl({
  dynamicPageEnd,
  ui,
}: {
  dynamicPageEnd: PaginationProps['dynamicPageEnd']
  ui: PaginationProps['ui']
}) {
  const pagination = usePaginationContext()
  const theme = useInheritedTheme()
  const crafts = useCraft(theme, 'tvPagination')
  const itemClassName = crafts.item(cxc(ui?.item))
  const pages = useMemo(() => {
    if (!(dynamicPageEnd && dynamicPageEnd > 1))
      return pagination.pages

    const { page, pages: currentPages, totalPages } = pagination
    if (page + dynamicPageEnd - 1 < totalPages) {
      const nextPages = [...currentPages]
      nextPages.splice(currentPages.length - 1, 1, { type: 'page', value: page + dynamicPageEnd })
      return nextPages
    }
    return currentPages
  }, [dynamicPageEnd, pagination])

  return (
    <ark.div
      className={crafts.control(cxc(ui?.control))}
      data-scope="pagination"
      data-part="control"
    >
      <ark.button className={crafts.item(cxc(ui?.firstPage))} onClick={() => pagination.goToFirstPage()}>
        <ChevronsLeft />
      </ark.button>
      <ArkPagination.PrevTrigger className={crafts.item(cxc(ui?.prevPage))}>
        <ChevronLeft />
      </ArkPagination.PrevTrigger>
      {pages.map((page, index) => {
        switch (page.type) {
          case 'page':
            return (
              <ArkPagination.Item
                key={`page-${page.value}-${index}`}
                {...page}
                className={itemClassName}
              >
                {page.value}
              </ArkPagination.Item>
            )
          case 'ellipsis':
            return (
              <ArkPagination.Ellipsis
                key={`ellipsis-${index}`}
                index={index}
                className={crafts.ellipsis(cxc(ui?.ellipsis))}
              >
                {'\u2026'}
              </ArkPagination.Ellipsis>
            )
          default: {
            const _exhaustive: never = page
            return _exhaustive
          }
        }
      })}
      <ArkPagination.NextTrigger className={crafts.item(cxc(ui?.nextPage))}>
        <ChevronRight />
      </ArkPagination.NextTrigger>
      <ark.button className={crafts.item(cxc(ui?.lastPage))} onClick={() => pagination.goToLastPage()}>
        <ChevronsRight />
      </ark.button>
    </ark.div>
  )
}

export const PaginationRoot = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      ui,
      dynamicPageEnd,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvPagination', craft)
    const crafts = useCraft(themed, 'tvPagination')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkPagination.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          {...props}
        >
          <PaginationControl dynamicPageEnd={dynamicPageEnd} ui={ui} />
          {children}
        </ArkPagination.Root>
      </ProvideComponentTheme>
    )
  },
)

PaginationRoot.displayName = 'Pagination'
