import { THEME_SIZE } from '@raxium/shared/constant'
import { PinInput } from '../index'

export function PinInputSizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-cc">
        xs / sm / base / lg
      </div>

      <div className="flex flex-col gap-3">
        {THEME_SIZE.map(size => (
          <PinInput
            key={size}
            theme={{ size }}
            count={4}
            placeholder="○"
          />
        ))}
      </div>
    </div>
  )
}
