import type { ToasterManagerExpose, ToasterManagerProps, ToasterWrap } from './props'
import { useCallback, useMemo, useState } from 'react'
import { DEFAULT_TOASTER_ID } from './props'
import { Toaster } from './Toaster'
import { ToasterRegistryProvider } from './toaster-registry'

export function ToasterManager({
  disableDefaultToaster = false,
  defaultToasterProps,
  children,
}: ToasterManagerProps) {
  const [toasters, setToasters] = useState<ToasterWrap[]>([])

  const register = useCallback((wrap: ToasterWrap) => {
    setToasters(prev => [...prev.filter(item => item.toasterId !== wrap.toasterId), wrap])
    return () => {
      setToasters(prev => prev.filter(item => item.toasterId !== wrap.toasterId))
    }
  }, [])

  const expose = useMemo<ToasterManagerExpose>(() => ({ toasters }), [toasters])
  void expose

  return (
    <ToasterRegistryProvider register={register} toasters={toasters}>
      {children}
      {!disableDefaultToaster && (
        <Toaster
          placement="bottom-end"
          overlap
          {...defaultToasterProps}
          toasterId={DEFAULT_TOASTER_ID}
        />
      )}
    </ToasterRegistryProvider>
  )
}

ToasterManager.displayName = 'ToasterManager'
