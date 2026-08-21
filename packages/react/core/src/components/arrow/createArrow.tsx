import type { ThemeNoCrafts, ThemeProps } from '@raxium/react/providers/theme'
import type { ComponentType, CSSProperties, HTMLAttributes } from 'react'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideStructuralComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useThemeAttrs } from '@raxium/react/hooks/useThemeAttrs'
import { cn } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export interface ArrowProps extends ThemeNoCrafts {
  className?: HTMLAttributes<HTMLElement>['className']
  ui?: {
    arrow?: HTMLAttributes<HTMLElement>['className']
    arrowTip?: HTMLAttributes<HTMLElement>['className']
  }
}

function arrowSizeCss(size: ThemeProps['size']): string {
  switch (size) {
    case 'xs':
      return '0.25rem'
    case 'sm':
      return '0.375rem'
    case 'base':
      return '0.5rem'
    case 'lg':
      return '0.625rem'
    case undefined:
      return '0.5rem'
    default: {
      const _exhaustive: never = size
      return _exhaustive
    }
  }
}

export function createArrow(
  ArrowNode: ComponentType<any>,
  ArrowTipNode: ComponentType<any>,
) {
  const Arrow = forwardRef<HTMLDivElement, ArrowProps>(
    ({ className, ui, theme: propsTheme, ...props }, ref) => {
      const theme = useInheritedTheme(propsTheme)
      const themeAttrs = useThemeAttrs(theme)

      return (
        <ProvideStructuralComponentTheme theme={theme}>
          <ArrowNode
            ref={ref}
            className={cn(ui?.arrow, className)}
            {...themeAttrs}
            style={{
              overflow: 'visible',
              zIndex: 0,
              '--arrow-size': arrowSizeCss(theme.size),
            } as CSSProperties}
            {...props}
          >
            <ArrowTipNode
              className={cn(theme.bordered && 'border', ui?.arrowTip)}
              {...themeAttrs}
            />
          </ArrowNode>
        </ProvideStructuralComponentTheme>
      )
    },
  )

  Arrow.displayName = ArrowNode.displayName ?? 'Arrow'
  return Arrow
}
