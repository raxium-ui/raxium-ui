import type { PolymorphicProps } from '@ark-ui/vue'
import type { ThemeCrafts } from '@raxium/vue/providers'
import type { HTMLAttributes } from 'vue'

export interface HotkeyProps extends PolymorphicProps, ThemeCrafts<'tvHotkey'> {
  hotkey: string
  placeholder?: string | ((focused: boolean) => string)
  class?: HTMLAttributes['class']
  disabled?: boolean
  readonly?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
  }
}
