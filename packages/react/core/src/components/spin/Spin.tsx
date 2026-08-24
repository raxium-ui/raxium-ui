import type { SpinProps } from './props'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { cxc } from '@raxium/themes/utils'
import { useEffect, useRef, useState } from 'react'
import { useSpinProvider } from './SpinProvider'

export function Spin({
  show,
  mode = 'inline',
  theme: propsTheme,
  craft,
  delay,
  ui,
  className,
  icon,
  children,
}: SpinProps) {
  const provider = useSpinProvider()
  const [visible, setVisible] = useState(!!show)
  const positionerRef = useRef<HTMLDivElement>(null)
  const parentPosition = useRef('')
  const theme = useTheme(propsTheme)
  const crafts = useCraft(theme, 'tvSpin', { mode }, craft)
  const isFullscreen = mode === 'fullscreen'

  useEffect(() => {
    if (!show && delay) {
      const id = window.setTimeout(() => setVisible(false), delay)
      return () => window.clearTimeout(id)
    }
    setVisible(!!show)
    return undefined
  }, [delay, show])

  useEffect(() => {
    const parent = isFullscreen ? document.body : positionerRef.current?.parentElement
    if (!parent)
      return
    if (!parentPosition.current)
      parentPosition.current = parent.style.position
    parent.style.position = visible ? 'relative' : parentPosition.current
    return () => {
      parent.style.position = parentPosition.current
    }
  }, [isFullscreen, visible])

  if (!visible)
    return null

  return (
    <div
      ref={positionerRef}
      className={crafts.positioner(cxc(ui?.positioner, className))}
    >
      <div className={crafts.mask(cxc(ui?.mask))} />
      <div className={crafts.indicator(cxc(ui?.indicator))}>
        {children ?? icon ?? provider?.renderIcon({ mode, theme, className: ui?.indicator })}
        {null}
      </div>
    </div>
  )
}

Spin.displayName = 'Spin'
