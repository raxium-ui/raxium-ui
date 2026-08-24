import type { ReactNode } from 'react'
import type { MessagerExpose, MessagerProps, RaxiumMessager } from './props'
import { Toaster as ArkToaster } from '@ark-ui/react/toast'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { createContext, useContext, useMemo } from 'react'
import { useRaxiumToaster } from '../toast/useRaxiumToaster'
import { Message } from './Message'

const MessagerContext = createContext<RaxiumMessager | null>(null)

export function Messager({
  theme: propsTheme,
  craft,
  showClose = true,
  children,
  ...storeProps
}: MessagerProps & { children?: ReactNode }) {
  const theme = useTheme(propsTheme)
  const themed = useThemeCraft(theme, 'tvMessage', craft)
  const { toaster, rawToaster, propsMap } = useRaxiumToaster({
    ...storeProps,
    placement: 'top',
  })
  const value = useMemo(() => toaster as unknown as RaxiumMessager, [toaster])

  return (
    <MessagerContext.Provider value={value}>
      {children}
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkToaster toaster={rawToaster}>
          {(toast) => {
            const extra = toast.id ? propsMap.current.get(toast.id) : undefined
            return (
              <Message
                options={{ ...toast, showClose }}
                {...extra}
              />
            )
          }}
        </ArkToaster>
      </ProvideComponentTheme>
    </MessagerContext.Provider>
  )
}

Messager.displayName = 'Messager'

export function useMessagerContext() {
  return useContext(MessagerContext)
}

export function useMessage(messager?: RaxiumMessager) {
  const fromContext = useMessagerContext()
  const api = messager ?? fromContext

  function create(...args: Parameters<RaxiumMessager['create']>) {
    if (!api) {
      console.warn('[RUI] there is no messager found, please make sure Messager is mounted in RUIConfig')
      return
    }
    const messageId = api.create(...args)
    return { messageId, messager: api }
  }

  return {
    message: {
      create,
      success: (options: Parameters<RaxiumMessager['create']>[0], extra?: Parameters<RaxiumMessager['create']>[1]) =>
        create({ ...options, type: 'success' }, extra),
      error: (options: Parameters<RaxiumMessager['create']>[0], extra?: Parameters<RaxiumMessager['create']>[1]) =>
        create({ ...options, type: 'error' }, extra),
      info: (options: Parameters<RaxiumMessager['create']>[0], extra?: Parameters<RaxiumMessager['create']>[1]) =>
        create({ ...options, type: 'info' }, extra),
      warning: (options: Parameters<RaxiumMessager['create']>[0], extra?: Parameters<RaxiumMessager['create']>[1]) =>
        create({ ...options, type: 'warning' }, extra),
      loading: (options: Parameters<RaxiumMessager['create']>[0], extra?: Parameters<RaxiumMessager['create']>[1]) =>
        create({ ...options, type: 'loading' }, extra),
    },
  }
}

export type { MessagerExpose }
