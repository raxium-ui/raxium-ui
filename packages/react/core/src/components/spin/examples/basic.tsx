import { Spin } from '../index'

export function SpinBasicExample() {
  return (
    <div className="relative w-full max-w-[520px] rounded-md border border-gray-33 p-4">
      <div className="text-sm text-gray-cc">内容区域（inline 模式会覆盖在父元素上）</div>
      <div className="mt-3 h-24 rounded bg-gray-0c" />
      <Spin show mode="inline" />
    </div>
  )
}
