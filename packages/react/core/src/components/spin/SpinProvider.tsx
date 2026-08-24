import type { ReactNode } from 'react'
import type { SpinProviderProps, SpinRenderProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { clsx } from '@raxium/themes/utils'
import { LoaderCircle } from 'lucide-react'
import { createContext, useContext } from 'react'

export interface SpinProviderValue {
  renderIcon: (props: SpinRenderProps) => ReactNode
}

const SpinProviderContext = createContext<SpinProviderValue | null>(null)

export function SpinProvider({ children, icon }: SpinProviderProps) {
  function renderIcon(props: SpinRenderProps) {
    const crafts = props.theme?.crafts?.tvSpin?.()
    const custom = typeof icon === 'function' ? icon(props) : icon
    if (custom != null) {
      return (
        <ark.span
          className={crafts?.icon({ class: clsx(props.className), ...props.theme })}
          asChild
          data-variant="custom"
        >
          {custom}
        </ark.span>
      )
    }
    return (
      <LoaderCircle
        className={crafts?.icon({ class: clsx('animate-spin', props.className), ...props.theme })}
        data-variant="default"
      />
    )
  }

  return (
    <SpinProviderContext.Provider value={{ renderIcon }}>
      {children}
    </SpinProviderContext.Provider>
  )
}

export function useSpinProvider() {
  return useContext(SpinProviderContext)
}
