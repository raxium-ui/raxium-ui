import { THEME_SIZE } from '@raxium/shared/constant'
import { Button } from '../../button'
import { Dialog } from '../index'

const body = 'Dialog body copy for size variants. The grid and footer spacing follow theme.size.'

export function DialogVariantsExample() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4">
      {THEME_SIZE.map(size => (
        <Dialog key={size} theme={{ size }}>
          <Dialog.Trigger asChild>
            <Button theme={{ size }} variant="outlined">{size}</Button>
          </Dialog.Trigger>
          <Dialog.Content className="w-110">
            <Dialog.Header>
              {size}
              {' '}
              Dialog
            </Dialog.Header>
            <Dialog.Body>{body}</Dialog.Body>
            <Dialog.Footer />
          </Dialog.Content>
        </Dialog>
      ))}
    </div>
  )
}
