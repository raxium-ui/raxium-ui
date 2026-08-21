import type { MouseEvent } from 'react'
import type { ButtonProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useRipple } from '@raxium/react/hooks/useRipple'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useComposedRefs } from '@raxium/react/utils'
import { getNodeCssVar } from '@raxium/shared/css'
import { cxc } from '@raxium/themes/utils'
import { LoaderCircle } from 'lucide-react'
import { forwardRef, useMemo, useRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      variant = 'solid',
      color = 'primary',
      disabled,
      ripple = false,
      loading = false,
      asChild = false,
      ui,
      tooltip: _tooltip,
      loadingIndicator,
      children,
      onClick,
      ...props
    },
    forwardedRef,
  ) => {
    const hostRef = useRef<HTMLButtonElement>(null)
    const ref = useComposedRefs(forwardedRef, hostRef)
    const theme = useTheme(propsTheme)
    const variants = useMemo(
      () => ({ variant, color, loading }),
      [variant, color, loading],
    )
    const crafts = useCraft(theme, 'tvButton', variants, craft)
    const { onRipple, Ripple } = useRipple(hostRef, {
      enabled: ripple && !disabled,
      color: () => getNodeCssVar(hostRef.current, '--rui-ripple-color', 'transparent'),
    })

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
      onRipple(event)
      onClick?.(event)
    }

    return (
      <ark.button
        ref={ref}
        className={crafts.root(cxc(ui?.root, className))}
        disabled={disabled}
        data-variant={variant}
        data-color={color}
        data-ripple={ripple ? true : undefined}
        data-loading={loading ? true : undefined}
        data-size={theme.size}
        asChild={asChild}
        onClick={handleClick}
        {...props}
      >
        {loading && (
          loadingIndicator ?? (
            <LoaderCircle className={crafts.loading(cxc(ui?.loading))} />
          )
        )}
        {children}
        {ripple ? <Ripple /> : null}
      </ark.button>
    )
  },
)

Button.displayName = 'Button'
