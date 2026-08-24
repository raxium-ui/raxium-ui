import type { ReactNode, RefObject } from 'react'
import type { TagsInputItemProps } from './props'
import { TagsInput as ArkTagsInput, useTagsInputItemContext } from '@ark-ui/react/tags-input'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { useTagsInputInline } from './tags-input-inline-context'

export const TagsInputItem = forwardRef<HTMLDivElement, TagsInputItemProps>(
  ({ className, theme: propsTheme, ui, value, children, ...props }, ref) => {
    const inline = useTagsInputInline()
    const theme = useInheritedTheme(propsTheme)
    const variants = useMemo(() => ({ inline }), [inline])
    const crafts = useCraft(theme, 'tvTagsInput', variants)
    const inputCrafts = useCraft(theme, 'tvInput')
    const previewRef = useRef<HTMLDivElement>(null)

    return (
      <ArkTagsInput.Item
        ref={ref}
        className={crafts.item(cxc(ui?.root, className))}
        value={value}
        {...props}
      >
        <TagsInputItemPreview
          previewRef={previewRef}
          className={crafts.itemPreview(cxc(ui?.preview))}
        >
          <ArkTagsInput.ItemText className={crafts.itemText(cxc(ui?.text))}>
            {value}
          </ArkTagsInput.ItemText>
          {children}
        </TagsInputItemPreview>
        <ArkTagsInput.ItemInput className={inputCrafts.root(cxc(crafts.itemInput(), ui?.input))} />
      </ArkTagsInput.Item>
    )
  },
)

function TagsInputItemPreview({
  previewRef,
  className,
  children,
}: {
  previewRef: RefObject<HTMLDivElement | null>
  className?: string
  children: ReactNode
}) {
  const item = useTagsInputItemContext()

  useEffect(() => {
    if (item.highlighted) {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [item.highlighted, previewRef])

  return (
    <ArkTagsInput.ItemPreview ref={previewRef} className={className}>
      {children}
    </ArkTagsInput.ItemPreview>
  )
}

TagsInputItem.displayName = 'TagsInput.Item'
