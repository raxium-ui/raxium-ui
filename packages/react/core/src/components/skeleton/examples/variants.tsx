import { Skeleton } from '../index'

export function SkeletonVariantsExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-cc">variant=pulse</div>
        <Skeleton className="h-4 w-64" variant="pulse" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-gray-cc">variant=wave</div>
        <Skeleton className="h-4 w-64" variant="wave" />
      </div>
    </div>
  )
}
