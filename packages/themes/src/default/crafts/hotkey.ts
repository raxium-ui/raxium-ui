import type { VariantProps } from '../../utils'
import { tv } from '../../utils'
import { tvInput } from './input'

const inputPrefix = 'rui-input'
const prefix = 'rui-hotkey'

export const tvHotkey = tv(
  {
    extend: tvInput,
    slots: {
      root: ['relative'],
      input: [],
    },
  },
  {
    slots: {
      root: [inputPrefix, prefix],
      input: [`${inputPrefix}-input`, `${prefix}-input`],
    },
  },
)

export type HotkeyVariants = VariantProps<typeof tvHotkey>
