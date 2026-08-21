import { Badge } from '../index'

export function BadgeDotExample() {
  return (
    <div className="flex items-center">
      <span className="text-white">Dot</span>
      <Badge variant="dot" as="sup" />
    </div>
  )
}
