import { useState } from 'react'
import { Pagination } from '../index'

const total = 123

export function PaginationControlledExample() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        page:
        {' '}
        <span className="text-gray-ff">{page}</span>
        {' '}
        / pageSize:
        {' '}
        <span className="text-gray-ff">{pageSize}</span>
        {' '}
        / totalPages:
        {' '}
        <span className="text-gray-ff">{totalPages}</span>
      </div>

      <div className="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
        <Pagination
          page={page}
          pageSize={pageSize}
          count={total}
          siblingCount={1}
          onPageChange={details => setPage(details.page)}
          onPageSizeChange={details => setPageSize(details.pageSize)}
        >
          <Pagination.PageSize
            prefix={<span className="text-sm text-gray-cc">每页</span>}
            suffix={<span className="text-sm text-gray-cc">条</span>}
          />
        </Pagination>
      </div>
    </div>
  )
}
