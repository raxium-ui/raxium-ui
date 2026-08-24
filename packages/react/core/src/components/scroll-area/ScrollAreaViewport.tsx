import type { ScrollAreaOverflow } from './overflow-context'
import type { ScrollAreaViewportProps } from './props'
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useCallback, useLayoutEffect, useRef } from 'react'
import { useSetScrollAreaOverflow } from './overflow-context'

function measureOverflow(
  viewport: HTMLDivElement | null,
  content: HTMLDivElement | null,
): ScrollAreaOverflow {
  if (!viewport || !content) {
    return { vertical: false, horizontal: false }
  }

  return {
    vertical: viewport.clientHeight < content.scrollHeight,
    horizontal: viewport.clientWidth < content.scrollWidth,
  }
}

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  (
    {
      className,
      theme: propsTheme,
      ui,
      children,
      onScrollStart,
      onScrollEnd,
      ...props
    },
    ref,
  ) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvScrollArea')
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const setOverflow = useSetScrollAreaOverflow()

    const setViewportRef = useCallback((node: HTMLDivElement | null) => {
      viewportRef.current = node
      if (typeof ref === 'function')
        ref(node)
      else if (ref)
        ref.current = node
    }, [ref])

    useLayoutEffect(() => {
      const viewport = viewportRef.current
      const content = contentRef.current
      const update = () => setOverflow(measureOverflow(viewport, content))

      update()
      if (!viewport)
        return

      const onStart = (event: Event) => onScrollStart?.(event)
      const onEnd = (event: Event) => onScrollEnd?.(event)
      viewport.addEventListener('scrollstart', onStart)
      viewport.addEventListener('scrollend', onEnd)

      if (!content) {
        return () => {
          viewport.removeEventListener('scrollstart', onStart)
          viewport.removeEventListener('scrollend', onEnd)
        }
      }

      const observer = new ResizeObserver(update)
      observer.observe(viewport)
      observer.observe(content)
      return () => {
        observer.disconnect()
        viewport.removeEventListener('scrollstart', onStart)
        viewport.removeEventListener('scrollend', onEnd)
      }
    }, [onScrollEnd, onScrollStart])

    return (
      <ArkScrollArea.Viewport
        ref={setViewportRef}
        className={crafts.viewport(cxc(ui?.root, className))}
        {...props}
      >
        <ArkScrollArea.Content
          ref={contentRef}
          className={crafts.content(cxc(ui?.content))}
        >
          {children}
        </ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
    )
  },
)

ScrollAreaViewport.displayName = 'ScrollArea.Viewport'
