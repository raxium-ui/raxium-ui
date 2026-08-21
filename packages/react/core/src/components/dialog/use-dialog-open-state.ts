import type { DialogTriggerFrom, OpenChangeDetails } from './dialog-intercept-context'
import type { DialogBeforeCloseHandler } from './props'
import { useCallback, useRef, useState } from 'react'

export function useDialogOpenState({
  open: openProp,
  defaultOpen,
  beforeClose,
  onOpenChange,
  getTriggerFrom,
}: {
  open?: boolean
  defaultOpen?: boolean
  beforeClose?: DialogBeforeCloseHandler
  onOpenChange?: (details: OpenChangeDetails & { from: DialogTriggerFrom }) => void
  getTriggerFrom: () => DialogTriggerFrom
}) {
  const isControlled = openProp !== undefined
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false)
  const pendingRef = useRef(false)
  const bypassRef = useRef(false)
  const [holdingOpen, setHoldingOpen] = useState(false)

  const sourceOpen = isControlled ? openProp : uncontrolledOpen
  const open = sourceOpen || holdingOpen

  const emitOpenChange = useCallback((details: OpenChangeDetails) => {
    onOpenChange?.({ ...details, from: getTriggerFrom() })
  }, [getTriggerFrom, onOpenChange])

  const applyOpen = useCallback((next: boolean) => {
    if (!isControlled)
      setUncontrolledOpen(next)
  }, [isControlled])

  const resumeBeforeClose = useCallback(() => {
    if (!pendingRef.current)
      return
    pendingRef.current = false
    bypassRef.current = false
    setHoldingOpen(false)
    applyOpen(true)
  }, [applyOpen])

  const handleOpenChange = useCallback((details: OpenChangeDetails) => {
    if (!details.open && beforeClose && !bypassRef.current) {
      if (pendingRef.current) {
        setHoldingOpen(true)
        applyOpen(true)
        return
      }
      pendingRef.current = true
      setHoldingOpen(true)
      applyOpen(true)
      beforeClose({
        from: getTriggerFrom(),
        resume: resumeBeforeClose,
        done: (autoClose = true) => {
          if (!pendingRef.current)
            return
          if (!autoClose) {
            resumeBeforeClose()
            return
          }
          pendingRef.current = false
          bypassRef.current = true
          setHoldingOpen(false)
          applyOpen(false)
          emitOpenChange({ open: false })
          queueMicrotask(() => {
            bypassRef.current = false
          })
        },
      })
      return
    }
    setHoldingOpen(false)
    applyOpen(details.open)
    if (!pendingRef.current)
      emitOpenChange(details)
  }, [applyOpen, beforeClose, emitOpenChange, getTriggerFrom, resumeBeforeClose])

  return {
    open,
    handleOpenChange,
    resumeBeforeClose,
  }
}
