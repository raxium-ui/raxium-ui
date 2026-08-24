import type { PaginationGoToTriggerProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { usePaginationGoTo } from './pagination-goto-context'

export function PaginationGoToTrigger({ children, ...props }: PaginationGoToTriggerProps) {
  const { goInputPage } = usePaginationGoTo()

  return (
    <ark.button type="button" {...props} onClick={() => goInputPage()}>
      {children}
    </ark.button>
  )
}

PaginationGoToTrigger.displayName = 'Pagination.GoToTrigger'
