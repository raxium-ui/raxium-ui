import { useState } from 'react'
import { Pagination } from '../index'

export function PaginationEventsExample() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [lines, setLines] = useState<string[]>([])

  function push(line: string) {
    setLines(current => [line, ...current].slice(0, 8))
  }

  const joined = lines.length ? lines.join('\n') : '（暂无事件）'

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="text-sm text-gray-cc">
        监听：onPageChange / onPageSizeChange
      </div>

      <div className="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
        <Pagination
          page={page}
          pageSize={pageSize}
          count={123}
          siblingCount={1}
          onPageChange={(details) => {
            setPage(details.page)
            push(`page-change: page=${details.page} pageSize=${details.pageSize}`)
          }}
          onPageSizeChange={(details) => {
            setPageSize(details.pageSize)
            push(`page-size-change: pageSize=${details.pageSize}`)
          }}
        >
          <Pagination.PageSize />
        </Pagination>
      </div>

      <pre className="w-full max-w-[720px] whitespace-pre-wrap rounded-md bg-gray-0c p-3 text-xs text-gray-cc">
        {joined}
      </pre>
    </div>
  )
}
