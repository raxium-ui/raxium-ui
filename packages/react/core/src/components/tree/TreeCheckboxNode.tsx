import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import type { RenderIconProps, RenderNameProps, ResolvedKeyMap, TreeNodeData, TreeNodeProps } from './props'
import { TreeView, useTreeViewContext, useTreeViewNodeContext } from '@ark-ui/react/tree-view'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { clsx } from '@raxium/themes/utils'
import { Check, ChevronRight, Minus } from 'lucide-react'
import { defaultRenderIcon, defaultRenderName } from './TreeNode'
import { useTreeContext } from './tree-context'

function onCheckableTreeRowSpaceKeydown(
  e: KeyboardEvent,
  opts: { disabled: boolean, toggle: () => void },
) {
  if (e.key !== ' ')
    return
  if (e.defaultPrevented)
    return
  if (e.shiftKey || e.ctrlKey || e.metaKey || e.altKey)
    return
  if (opts.disabled)
    return
  e.preventDefault()
  e.stopPropagation()
  opts.toggle()
}

const defaultKeyMap: ResolvedKeyMap = {
  id: 'id',
  name: 'name',
  children: 'children',
  icon: 'icon',
}

export function TreeCheckboxNodeItem({
  className,
  node,
  nodeIndent,
  indexPath,
  keyMap,
  renderIcon = defaultRenderIcon,
  renderName = defaultRenderName,
  ui,
  style,
}: TreeNodeProps) {
  const theme = useInheritedTheme()
  const { branchCrafts, itemCrafts, checkboxCrafts } = useTreeContext()
  const resolved: ResolvedKeyMap = { ...defaultKeyMap, ...keyMap }
  const childrenNodes = node[resolved.children] as TreeNodeData[] | undefined

  const branchClx = {
    root: branchCrafts.root({ class: clsx(ui?.branch, className), ...theme }),
    control: branchCrafts.control({ class: clsx(ui?.branchControl), ...theme }),
    title: branchCrafts.title({ class: clsx(ui?.branchTitle), ...theme }),
    text: branchCrafts.text({ class: clsx(ui?.branchText), ...theme }),
    indicator: branchCrafts.indicator({ class: clsx(ui?.branchIndicator), ...theme }),
    content: branchCrafts.content({ class: clsx(ui?.branchContent), ...theme }),
    icon: branchCrafts.icon({ class: clsx(ui?.branchIcon), ...theme }),
  }
  const itemClx = {
    root: itemCrafts.root({ class: clsx(ui?.item, className), ...theme }),
    title: itemCrafts.title({ class: clsx(ui?.itemTitle), ...theme }),
    text: itemCrafts.text({ class: clsx(ui?.itemText), ...theme }),
    icon: itemCrafts.icon({ class: clsx(ui?.itemIcon), ...theme }),
  }
  const branchCheckboxClx = {
    control: checkboxCrafts.control({
      class: branchCrafts.checkbox({ class: clsx(ui?.branchCheckbox), ...theme }),
      ...theme,
    }),
    indicator: checkboxCrafts.indicator({
      class: branchCrafts.checkboxIndicator({ class: clsx(ui?.branchCheckboxIndicator), ...theme }),
      ...theme,
    }),
    indicatorChecked: checkboxCrafts.indicatorChecked({ ...theme }),
    indicatorMinus: checkboxCrafts.indicatorMinus({ ...theme }),
  }
  const itemCheckboxClx = {
    control: checkboxCrafts.control({
      class: itemCrafts.checkbox({ class: clsx(ui?.itemCheckbox), ...theme }),
      ...theme,
    }),
    indicator: checkboxCrafts.indicator({
      class: itemCrafts.checkboxIndicator({ class: clsx(ui?.itemCheckboxIndicator), ...theme }),
      ...theme,
    }),
    indicatorChecked: checkboxCrafts.indicatorChecked({ ...theme }),
    indicatorMinus: checkboxCrafts.indicatorMinus({ ...theme }),
  }

  return (
    <TreeView.NodeProvider node={node as never} indexPath={indexPath}>
      <TreeCheckboxBody
        node={node}
        nodeIndent={nodeIndent}
        indexPath={indexPath}
        resolved={resolved}
        childrenNodes={childrenNodes}
        branchClx={branchClx}
        itemClx={itemClx}
        branchCheckboxClx={branchCheckboxClx}
        itemCheckboxClx={itemCheckboxClx}
        renderIcon={renderIcon}
        renderName={renderName}
        ui={ui}
        style={style}
      />
    </TreeView.NodeProvider>
  )
}

function TreeCheckboxBody({
  node,
  nodeIndent,
  indexPath,
  resolved,
  childrenNodes,
  branchClx,
  itemClx,
  branchCheckboxClx,
  itemCheckboxClx,
  renderIcon,
  renderName,
  ui,
  style,
}: {
  node: TreeNodeData
  nodeIndent?: number
  indexPath: number[]
  resolved: ResolvedKeyMap
  childrenNodes?: TreeNodeData[]
  branchClx: Record<string, string>
  itemClx: Record<string, string>
  branchCheckboxClx: Record<string, string>
  itemCheckboxClx: Record<string, string>
  renderIcon: (props: RenderIconProps) => ReactNode
  renderName: (props: RenderNameProps) => ReactNode
  ui: TreeNodeProps['ui']
  style?: CSSProperties
}) {
  const state = useTreeViewNodeContext()
  const treeView = useTreeViewContext()

  const checkbox = (clx: Record<string, string>) => (
    <TreeView.NodeCheckbox className={clx.control}>
      <div className={clx.indicator}>
        <TreeView.NodeCheckboxIndicator
          indeterminate={<Minus className={clx.indicatorMinus} />}
        >
          <Check className={clx.indicatorChecked} />
        </TreeView.NodeCheckboxIndicator>
      </div>
    </TreeView.NodeCheckbox>
  )

  if (childrenNodes) {
    return (
      <TreeView.Branch
        className={branchClx.root}
        style={nodeIndent ? { '--indent': `${nodeIndent}px`, ...style } as CSSProperties : style}
      >
        <TreeView.BranchControl
          className={branchClx.control}
          onKeyDown={(e) => {
            onCheckableTreeRowSpaceKeydown(e, {
              disabled: !!state.disabled,
              toggle: () => treeView.toggleChecked(String(node[resolved.id]), true),
            })
          }}
        >
          <div className={branchClx.title} data-scope="tree-view" data-part="branch-title">
            {checkbox(branchCheckboxClx)}
            {renderIcon({
              node,
              icon: node[resolved.icon],
              state,
              className: branchClx.icon,
            })}
            <TreeView.BranchText className={branchClx.text}>
              {renderName({ name: node[resolved.name], node, state })}
            </TreeView.BranchText>
          </div>
          <TreeView.BranchIndicator className={branchClx.indicator}>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent className={branchClx.content}>
          <TreeView.BranchIndentGuide />
          {childrenNodes.map((child, index) => (
            <TreeCheckboxNodeItem
              key={String(child[resolved.id])}
              node={child}
              indexPath={[...indexPath, index]}
              keyMap={resolved}
              renderIcon={renderIcon}
              renderName={renderName}
              ui={ui}
            />
          ))}
        </TreeView.BranchContent>
      </TreeView.Branch>
    )
  }

  return (
    <TreeView.Item
      className={itemClx.root}
      style={style}
      onKeyDown={(e) => {
        onCheckableTreeRowSpaceKeydown(e, {
          disabled: !!state.disabled,
          toggle: () => treeView.toggleChecked(String(node[resolved.id]), true),
        })
      }}
    >
      <div className={itemClx.title} data-scope="tree-view" data-part="item-title">
        {checkbox(itemCheckboxClx)}
        {renderIcon({
          node,
          icon: node[resolved.icon],
          state,
          className: itemClx.icon,
        })}
        <TreeView.ItemText className={itemClx.text}>
          {renderName({ name: node[resolved.name], node, state })}
        </TreeView.ItemText>
      </div>
    </TreeView.Item>
  )
}

TreeCheckboxNodeItem.displayName = 'Tree.CheckboxNode'
