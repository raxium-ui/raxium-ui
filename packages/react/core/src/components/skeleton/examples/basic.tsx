import { Skeleton } from '../index'

export function SkeletonBasicExample() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-64" />
    </div>
  )
}
