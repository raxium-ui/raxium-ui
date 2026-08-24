import { useState } from 'react'
import { Pagination } from '../index'

export function PaginationMinimalExample() {
  const [page, setPage] = useState(1)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        page:
        {' '}
        <span className="text-gray-ff">{page}</span>
      </div>

      <div className="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
        <Pagination
          page={page}
          count={80}
          defaultPageSize={10}
          siblingCount={1}
          onPageChange={details => setPage(details.page)}
        />
      </div>
    </div>
  )
}
