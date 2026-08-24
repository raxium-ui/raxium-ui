import { useState } from 'react'
import { Pagination } from '../index'

export function PaginationLinkTypeExample() {
  const [page, setPage] = useState(3)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-sm text-gray-cc">
        type=link（仅演示 href 生成）
      </div>

      <div className="w-full max-w-[720px] rounded-md border border-gray-33 p-3">
        <Pagination
          page={page}
          type="link"
          count={120}
          defaultPageSize={10}
          getPageUrl={({ page: nextPage }) => `#page=${nextPage}`}
          onPageChange={details => setPage(details.page)}
        />
      </div>
    </div>
  )
}
