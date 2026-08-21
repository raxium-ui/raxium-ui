import type { EditableInteractOutsideEvent } from '@ark-ui/react/editable'
import type { EditableProps } from './props'
import { Editable as ArkEditable } from '@ark-ui/react/editable'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { findUp } from '@raxium/shared/dom'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

const exceptParts = ['input-area', 'clear-button']

function interactTarget(event: EditableInteractOutsideEvent): HTMLElement | undefined {
  const detail = event.detail as { originalEvent?: Event, target?: EventTarget }
  const raw = detail?.originalEvent?.target ?? detail?.target
  return raw instanceof HTMLElement ? raw : undefined
}

export const EditableRoot = forwardRef<HTMLDivElement, EditableProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      prefix,
      suffix,
      ui,
      children,
      onInteractOutside,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvEditable', craft)
    const crafts = useCraft(themed, 'tvEditable')

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <ArkEditable.Root
          ref={ref}
          className={crafts.root(cxc(ui?.root, className))}
          onInteractOutside={(event) => {
            const target = interactTarget(event)
            if (
              findUp(target, node =>
                node.dataset.scope === 'editable' && exceptParts.includes(node.dataset.part ?? ''))
            ) {
              event.preventDefault()
              onInteractOutside?.(event)
            }
          }}
          {...props}
        >
          {prefix}
          <ArkEditable.Area className={crafts.area(cxc(ui?.area))}>
            {children}
          </ArkEditable.Area>
          {suffix}
        </ArkEditable.Root>
      </ProvideComponentTheme>
    )
  },
)

EditableRoot.displayName = 'Editable'
