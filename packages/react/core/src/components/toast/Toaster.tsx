import type { ToasterProps } from './props'
import { Toaster as ArkToaster } from '@ark-ui/react/toast'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { Toast } from './Toast'
import { useToasterRegistry } from './toaster-registry'
import { useRaxiumToaster } from './useRaxiumToaster'

export const Toaster = forwardRef<{ toasterId?: string, toaster: ReturnType<typeof useRaxiumToaster>['toaster'] }, ToasterProps>(
  ({ toasterId, theme: propsTheme, craft, children, ...storeProps }, ref) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvToast', craft)
    const { toaster, rawToaster, propsMap } = useRaxiumToaster(storeProps)
    const register = useToasterRegistry()

    useImperativeHandle(ref, () => ({ toasterId, toaster }), [toaster, toasterId])

    useEffect(() => {
      return register?.({ toasterId, toaster })
    }, [register, toaster, toasterId])

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkToaster toaster={rawToaster}>
          {(toast) => {
            const extra = toast.id ? propsMap.current.get(toast.id) : undefined
            if (children)
              return children(toast, extra)
            return <Toast options={toast} {...extra} />
          }}
        </ArkToaster>
      </ProvideComponentTheme>
    )
  },
)

Toaster.displayName = 'Toaster'
