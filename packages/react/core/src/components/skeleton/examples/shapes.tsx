import { Skeleton } from '../index'

export function SkeletonShapesExample() {
  return (
    <div className="w-full flex items-center gap-6">
      <div className="flex flex-col items-start gap-2">
        <div className="text-sm text-gray-cc">rect</div>
        <Skeleton className="h-14 w-56" shape="rect" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <div className="text-sm text-gray-cc">circle</div>
        <Skeleton className="size-14" shape="circle" />
      </div>
    </div>
  )
}
