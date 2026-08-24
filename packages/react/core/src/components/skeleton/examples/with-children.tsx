import { Skeleton } from '../index'

export function SkeletonWithChildrenExample() {
  return (
    <div className="w-full max-w-[560px] rounded-md border border-gray-33 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12" shape="circle" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Skeleton className="h-28 w-full">
          <div className="h-full w-full rounded bg-gray-0c" />
        </Skeleton>
        <div className="text-xs text-gray-55">
          Skeleton wraps children so layout placeholders stay stable.
        </div>
      </div>
    </div>
  )
}
