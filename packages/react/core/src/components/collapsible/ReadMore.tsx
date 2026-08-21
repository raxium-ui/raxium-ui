import type { ReactNode } from 'react'
import type { ReadMoreContextValue, ReadMoreProps } from './props'
import { useCollapsibleContext } from '@ark-ui/react/collapsible'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { rem2px } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { createContext, forwardRef, useContext, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { CollapsibleRoot } from './Collapsible'
import { CollapsibleContent } from './CollapsibleContent'
import { CollapsibleTrigger } from './CollapsibleTrigger'

const ReadMoreContext = createContext<ReadMoreContextValue | null>(null)

export function useReadMoreContext(): ReadMoreContextValue {
  const ctx = useContext(ReadMoreContext)
  if (!ctx)
    throw new Error('useReadMoreContext must be used within ReadMore')
  return ctx
}

function collapsedHeightPx(collapsedHeight: ReadMoreProps['collapsedHeight']) {
  if (typeof collapsedHeight === 'string')
    return rem2px(collapsedHeight)
  return collapsedHeight ?? 0
}

function DefaultReadMoreTrigger({
  className,
  more,
  less,
}: {
  className: string
  more: string
  less: string
}) {
  const { open } = useCollapsibleContext()
  return (
    <CollapsibleTrigger className={className} indicator={false}>
      {open ? less : more}
    </CollapsibleTrigger>
  )
}

export const ReadMore = forwardRef<HTMLDivElement, ReadMoreProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      ui,
      text,
      trigger,
      children,
      collapsedHeight,
      ...props
    },
    ref,
  ) => {
    const measureRef = useRef<HTMLDivElement>(null)
    const [measuredHeight, setMeasuredHeight] = useState(0)
    const theme = useTheme(propsTheme)
    const crafts = useCraft(theme, 'tvReadMore', undefined, craft)
    const more = text?.more ?? 'View More'
    const less = text?.less ?? 'View Less'
    const triggerClassName = crafts.trigger(cxc(ui?.trigger))
    const showTrigger = measuredHeight > collapsedHeightPx(collapsedHeight)

    useLayoutEffect(() => {
      const el = measureRef.current
      if (!el)
        return
      const update = () => setMeasuredHeight(el.getBoundingClientRect().height)
      update()
      const observer = new ResizeObserver(update)
      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    const readMore = useMemo<ReadMoreContextValue>(() => ({
      show: showTrigger,
      text: { more, less },
      className: triggerClassName,
    }), [less, more, showTrigger, triggerClassName])

    let triggerNode: ReactNode = null
    if (trigger != null)
      triggerNode = trigger
    else if (showTrigger)
      triggerNode = <DefaultReadMoreTrigger className={triggerClassName} more={more} less={less} />

    return (
      <ReadMoreContext.Provider value={readMore}>
        <CollapsibleRoot
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          collapsedHeight={collapsedHeight}
          {...props}
        >
          <CollapsibleContent className={crafts.content(cxc(ui?.content))}>
            <div ref={measureRef}>
              {children}
            </div>
          </CollapsibleContent>
          {triggerNode}
        </CollapsibleRoot>
      </ReadMoreContext.Provider>
    )
  },
)

ReadMore.displayName = 'ReadMore'
