import type { ToastProps } from './props'
import { ark } from '@ark-ui/react/factory'
import {
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  useToastContext,
} from '@ark-ui/react/toast'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cn, cxc } from '@raxium/themes/utils'
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle, X } from 'lucide-react'

function TypeIcon({ className, type }: { className?: string, type?: string }) {
  const props = { className, 'data-type': type }
  switch (type) {
    case 'success':
      return <CircleCheck {...props} />
    case 'error':
      return <CircleX {...props} />
    case 'warning':
      return <CircleAlert {...props} />
    case 'loading':
      return <LoaderCircle {...props} className={cn(className, 'animate-spin')} />
    case 'info':
    default:
      return <Info {...props} />
  }
}

export function Toast({
  className,
  theme: propsTheme,
  options,
  ui,
  icon,
  close,
  ...props
}: ToastProps) {
  const toast = useToastContext()
  const theme = useInheritedTheme({ ...propsTheme, ...options?.theme })
  const crafts = useCraft(theme, 'tvToast')

  return (
    <ToastRoot className={crafts.root(cxc(ui?.root, className))} {...props}>
      <ark.div
        className={crafts.content(cxc(ui?.content))}
        data-scope="toast"
        data-part="content"
        data-placement={toast.placement}
        data-type={toast.type}
      >
        {options?.render
          ? options.render()
          : (
              <>
                {icon ?? <TypeIcon className={crafts.icon(cxc(ui?.icon))} type={toast.type} />}
                <ark.div
                  className={crafts.inner(cxc(ui?.inner))}
                  data-part="inner"
                  data-scope="toast"
                >
                  {options?.title != null && (
                    <ToastTitle className={crafts.title(cxc(ui?.title))}>
                      {options.title}
                    </ToastTitle>
                  )}
                  {options?.description != null && (
                    <ToastDescription className={crafts.description(cxc(ui?.description))}>
                      {options.description}
                    </ToastDescription>
                  )}
                </ark.div>
                {toast.type !== 'loading' && (
                  close ?? (
                    <ToastCloseTrigger className={crafts.close(cxc(ui?.close))}>
                      <X />
                    </ToastCloseTrigger>
                  )
                )}
              </>
            )}
      </ark.div>
    </ToastRoot>
  )
}

Toast.displayName = 'Toast'
