import { THEME_SIZE } from '@raxium/shared/constant'
import { useState } from 'react'
import { Pagination } from '../index'

export function PaginationSizesExample() {
  const [page, setPage] = useState(1)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="text-sm text-gray-cc">
        sm / base / lg
      </div>

      <div className="w-full max-w-[720px] flex flex-col gap-3 rounded-md border border-gray-33 p-3">
        {THEME_SIZE.map(size => (
          <Pagination
            key={size}
            theme={{ size }}
            page={page}
            count={200}
            defaultPageSize={10}
            siblingCount={1}
            onPageChange={details => setPage(details.page)}
          />
        ))}
      </div>
    </div>
  )
}
