import type { DialogProps } from './props'
import type { DialogTriggerFrom } from './dialog-intercept-context'
import { Dialog as ArkDialog } from '@ark-ui/react/dialog'
import { useConfig } from '@raxium/react/hooks/useConfig'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { useCallback, useMemo, useRef } from 'react'
import { DialogInterceptContext, TriggerFrom } from './dialog-intercept-context'
import { useDialogOpenState } from './use-dialog-open-state'

export function DialogRoot({
  className: _className,
  theme: propsTheme,
  craft,
  lazyMount,
  unmountOnExit,
  beforeClose,
  open: openProp,
  defaultOpen,
  onOpenChange,
  onEscapeKeyDown,
  onInteractOutside,
  children,
  ...props
}: DialogProps) {
  const dialogConfig = useConfig('dialog', { lazyMount, unmountOnExit })
  const triggerFromRef = useRef<DialogTriggerFrom>(undefined)
  const setTriggerFrom = useCallback((from: DialogTriggerFrom) => {
    triggerFromRef.current = from
  }, [])
  const intercept = useMemo(
    () => ({ triggerFromRef, setTriggerFrom }),
    [setTriggerFrom],
  )
  const getTriggerFrom = useCallback(() => triggerFromRef.current, [])
  const { open, handleOpenChange } = useDialogOpenState({
    open: openProp,
    defaultOpen,
    beforeClose,
    onOpenChange,
    getTriggerFrom,
  })
  const theme = useTheme(propsTheme, dialogConfig?.theme)
  const themed = useThemeCraft(theme, 'tvDialog', craft)

  return (
    <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
      <DialogInterceptContext.Provider value={intercept}>
        <ArkDialog.Root
          open={open}
          lazyMount={dialogConfig?.lazyMount}
          unmountOnExit={dialogConfig?.unmountOnExit}
          onOpenChange={handleOpenChange}
          onEscapeKeyDown={(event) => {
            setTriggerFrom(TriggerFrom.ESCAPE)
            onEscapeKeyDown?.(event)
          }}
          onInteractOutside={(event) => {
            setTriggerFrom(TriggerFrom.OUTSIDE)
            onInteractOutside?.(event)
          }}
          {...props}
        >
          {children}
        </ArkDialog.Root>
      </DialogInterceptContext.Provider>
    </ProvideComponentTheme>
  )
}

DialogRoot.displayName = 'Dialog'
