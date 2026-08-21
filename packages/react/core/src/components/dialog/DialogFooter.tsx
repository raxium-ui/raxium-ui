import type { ThemeProps } from '@raxium/react/providers/theme'
import type { DialogFooterProps } from './props'
import { ark } from '@ark-ui/react/factory'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { useStableId } from '@raxium/react/hooks/useStableId'
import { cn, cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'
import { Button } from '../button'
import { TriggerFrom } from './dialog-intercept-context'
import { DialogCloseTrigger } from './DialogCloseTrigger'

function tokenTheme(theme: { skin?: ThemeProps['skin'], surface?: ThemeProps['surface'], size?: ThemeProps['size'], unstyled?: boolean, bordered?: boolean }): ThemeProps {
  return {
    skin: theme.skin,
    surface: theme.surface,
    size: theme.size,
    unstyled: theme.unstyled,
    bordered: theme.bordered,
  }
}

export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, theme: propsTheme, ui, widget, onOk, onCancel, children }, ref) => {
    const id = useStableId('dialog-footer')
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvDialog')
    const buttonTheme = tokenTheme(theme)
    const { text: cancelText, className: cancelClass, ...cancelProps } = widget?.cancel ?? {}
    const { text: okText, className: okClass, ...okProps } = widget?.ok ?? {}

    return (
      <ark.div
        ref={ref}
        id={id}
        className={crafts.footer(cxc(ui?.root, className))}
        data-scope="dialog"
        data-part="footer"
      >
        {children === undefined
          ? (
              <>
                <DialogCloseTrigger asChild from={TriggerFrom.CANCEL_BUTTON}>
                  <Button
                    variant="text"
                    color="default"
                    theme={buttonTheme}
                    {...cancelProps}
                    className={cn(cancelClass, ui?.cancel)}
                    onClick={onCancel}
                  >
                    {cancelText ?? 'Cancel'}
                  </Button>
                </DialogCloseTrigger>
                <DialogCloseTrigger asChild from={TriggerFrom.OK_BUTTON}>
                  <Button
                    theme={buttonTheme}
                    {...okProps}
                    className={cn(okClass, ui?.ok)}
                    onClick={onOk}
                  >
                    {okText ?? 'OK'}
                  </Button>
                </DialogCloseTrigger>
              </>
            )
          : children}
      </ark.div>
    )
  },
)

DialogFooter.displayName = 'Dialog.Footer'
