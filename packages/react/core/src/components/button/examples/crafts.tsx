import { Button } from '../index'

export function ButtonCraftsExample() {
  return (
    <Button
      craft={{
        variants: {
          size: {
            base: {
              root: 'size-10 text-xs',
            },
          },
        },
      }}
    >
      Crafts
    </Button>
  )
}
