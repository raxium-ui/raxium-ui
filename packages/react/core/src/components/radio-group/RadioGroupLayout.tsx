import type { RadioGroupLayoutProps } from './props'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'

export function RadioGroupLayout({
  className,
  layout = 'stack',
  children,
}: RadioGroupLayoutProps) {
  const theme = useInheritedTheme()
  const crafts = useCraft(theme, 'tvRadioGroup', { layout })

  return (
    <div
      className={crafts.layout(cxc(className))}
      data-scope="radio-group"
      data-part="layout"
    >
      {children}
    </div>
  )
}

RadioGroupLayout.displayName = 'RadioGroup.Layout'
