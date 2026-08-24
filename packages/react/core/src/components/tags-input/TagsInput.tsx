import type { TagsInputProps } from './props'
import { TagsInput as ArkTagsInput, useTagsInputContext } from '@ark-ui/react/tags-input'
import { useCraft } from '@raxium/react/hooks/useCraft'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { ProvideComponentTheme } from '@raxium/react/hooks/useProvideComponentTheme'
import { useTheme } from '@raxium/react/hooks/useTheme'
import { useThemeCraft } from '@raxium/react/hooks/useThemeCraft'
import { cxc } from '@raxium/themes/utils'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import { ScrollArea } from '../scroll-area'
import { TagsInputInlineProvider } from './tags-input-inline-context'

function TagsInputControl({
  inline,
  ui,
  children,
}: {
  inline: boolean
  ui: TagsInputProps['ui']
  children: TagsInputProps['children']
}) {
  const tagsInput = useTagsInputContext()
  const theme = useInheritedTheme()
  const empty = tagsInput.value.length === 0
  const variants = useMemo(() => ({ inline, empty }), [inline, empty])
  const crafts = useCraft(theme, 'tvTagsInput', variants)
  const inputCrafts = useCraft(theme, 'tvInput')
  const viewportRef = useRef<HTMLDivElement>(null)
  const previousLengthRef = useRef(tagsInput.value.length)
  const scrollbarSize = theme.size === 'sm' ? 'xs' : 'sm'

  useEffect(() => {
    const nextLength = tagsInput.value.length
    if (nextLength > previousLengthRef.current) {
      viewportRef.current?.scrollTo({
        left: 9999,
        behavior: 'smooth',
      })
    }
    previousLengthRef.current = nextLength
  }, [tagsInput.value.length])

  return (
    <ArkTagsInput.Control className={inputCrafts.root(cxc(crafts.control(), ui?.control))}>
      {inline
        ? (
            <ScrollArea className={crafts.scrollArea()}>
              <ScrollArea.Viewport ref={viewportRef} ui={{ content: crafts.scrollAreaContent() }}>
                {children}
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation="horizontal"
                theme={{ size: scrollbarSize }}
              />
            </ScrollArea>
          )
        : children}
      <ArkTagsInput.Input className={inputCrafts.input(cxc(crafts.input(), ui?.input))} />
    </ArkTagsInput.Control>
  )
}

export const TagsInputRoot = forwardRef<HTMLDivElement, TagsInputProps>(
  (
    {
      className,
      theme: propsTheme,
      craft,
      inline = true,
      ui,
      prefix,
      suffix,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme(propsTheme)
    const themed = useThemeCraft(theme, 'tvTagsInput', craft)
    const crafts = useCraft(themed, 'tvTagsInput', { inline })

    return (
      <ProvideComponentTheme theme={themed} propsTheme={propsTheme}>
        <TagsInputInlineProvider value={inline}>
          <ArkTagsInput.Root
            ref={ref}
            className={crafts.root(cxc(ui?.root, className))}
            {...props}
          >
            {prefix}
            <TagsInputControl inline={inline} ui={ui}>
              {children}
            </TagsInputControl>
            {suffix}
            <ArkTagsInput.HiddenInput />
          </ArkTagsInput.Root>
        </TagsInputInlineProvider>
      </ProvideComponentTheme>
    )
  },
)

TagsInputRoot.displayName = 'TagsInput'
