import type { EditablePreviewProps } from './props'
import { Editable as ArkEditable } from '@ark-ui/react/editable'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef } from 'react'

export const EditablePreview = forwardRef<HTMLSpanElement, EditablePreviewProps>(
  ({ className, theme: propsTheme, children, ...props }, ref) => {
    const theme = useInheritedTheme(propsTheme)
    const crafts = useCraft(theme, 'tvEditable')

    return (
      <ArkEditable.Preview
        ref={ref}
        className={crafts.preview(cxc(className))}
        {...props}
      >
        {children}
      </ArkEditable.Preview>
    )
  },
)

EditablePreview.displayName = 'Editable.Preview'
