import { Plus } from 'lucide-react'
import { Button } from '../index'

const variants = ['solid', 'outlined', 'filled', 'text', 'link'] as const
const colors = ['primary', 'default', 'danger', 'warning', 'info'] as const

export function ButtonVariantsExample() {
  return (
    <div className="w-full flex flex-col gap-4">
      {variants.map(variant => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-20 shrink-0 text-sm opacity-60">{variant}</span>
          {colors.map(color => (
            <Button key={color} variant={variant} color={color}>
              {color}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-4">
        <span className="w-20 shrink-0 text-sm opacity-60">icon</span>
        {colors.map(color => (
          <Button key={color} variant="icon" color={color}>
            <Plus />
          </Button>
        ))}
      </div>
    </div>
  )
}
