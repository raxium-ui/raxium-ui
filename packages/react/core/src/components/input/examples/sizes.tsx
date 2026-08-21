import { THEME_SIZE } from '@raxium/shared/constant'
import { Input } from '../index'

export function InputSizesExample() {
  return (
    <div className="w-full flex flex-col gap-3">
      {THEME_SIZE.map(size => (
        <Input key={size} className="w-60" theme={{ size }} placeholder={size} />
      ))}
    </div>
  )
}
