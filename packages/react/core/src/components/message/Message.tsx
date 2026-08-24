import type { MessageProps } from './props'
import { ark } from '@ark-ui/react/factory'
import {
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
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

export function Message({
  className,
  theme: propsTheme,
  options,
  ui,
  icon,
  close,
  ...props
}: MessageProps) {
  const toast = useToastContext()
  const theme = useInheritedTheme({ ...propsTheme, ...options?.theme })
  const crafts = useCraft(theme, 'tvMessage')
  const showClose = options.showClose !== false && toast.type !== 'loading'

  return (
    <ToastRoot className={crafts.root(cxc(ui?.root, className))} {...props}>
      <ark.div
        className={crafts.content(cxc(ui?.content))}
        data-scope="toast"
        data-part="content"
        data-placement={toast.placement}
        data-type={toast.type}
      >
        {options.render
          ? options.render()
          : (
              <>
                {icon ?? <TypeIcon className={crafts.icon(cxc(ui?.icon))} type={toast.type} />}
                {options.description != null && (
                  <ToastDescription className={crafts.description(cxc(ui?.description))}>
                    {options.description}
                  </ToastDescription>
                )}
                {showClose && (
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

Message.displayName = 'Message'
