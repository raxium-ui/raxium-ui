import type { CSSProperties, ReactNode } from 'react'
import type { RenderIconProps, RenderNameProps, ResolvedKeyMap, TreeNodeData, TreeNodeProps } from './props'
import { TreeView, useTreeViewNodeContext } from '@ark-ui/react/tree-view'
import { useInheritedTheme } from '@raxium/react/hooks/useInheritedTheme'
import { clsx } from '@raxium/themes/utils'
import { ChevronRight } from 'lucide-react'
import { cloneElement, isValidElement } from 'react'
import { Icon } from '../icon'
import { useTreeContext } from './tree-context'

const defaultKeyMap: ResolvedKeyMap = {
  id: 'id',
  name: 'name',
  children: 'children',
  icon: 'icon',
}

export function defaultRenderIcon({ icon, className }: RenderIconProps): ReactNode {
  if (typeof icon === 'string')
    return <Icon className={className} icon={icon} />
  if (isValidElement(icon))
    return cloneElement(icon, { className } as { className?: string })
  return null
}

export function defaultRenderName({ name }: RenderNameProps): ReactNode {
  if (typeof name === 'string' || isValidElement(name))
    return name as ReactNode
  return null
}

export function TreeNodeItem({
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
  const { branchCrafts, itemCrafts } = useTreeContext()
  const resolved: ResolvedKeyMap = { ...defaultKeyMap, ...keyMap }
  const children = node[resolved.children] as TreeNodeData[] | undefined

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

  return (
    <TreeView.NodeProvider node={node as never} indexPath={indexPath}>
      <TreeNodeBody
        node={node}
        nodeIndent={nodeIndent}
        indexPath={indexPath}
        resolved={resolved}
        childrenNodes={children}
        branchClx={branchClx}
        itemClx={itemClx}
        renderIcon={renderIcon}
        renderName={renderName}
        ui={ui}
        style={style}
      />
    </TreeView.NodeProvider>
  )
}

function TreeNodeBody({
  node,
  nodeIndent,
  indexPath,
  resolved,
  childrenNodes,
  branchClx,
  itemClx,
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
  renderIcon: (props: RenderIconProps) => ReactNode
  renderName: (props: RenderNameProps) => ReactNode
  ui: TreeNodeProps['ui']
  style?: CSSProperties
}) {
  const state = useTreeViewNodeContext()

  if (childrenNodes) {
    return (
      <TreeView.Branch
        className={branchClx.root}
        style={nodeIndent ? { '--indent': `${nodeIndent}px`, ...style } as CSSProperties : style}
      >
        <TreeView.BranchControl className={branchClx.control}>
          <div className={branchClx.title} data-scope="tree-view" data-part="branch-title">
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
            <TreeNodeItem
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
    <TreeView.Item className={itemClx.root} style={style}>
      <div className={itemClx.title} data-scope="tree-view" data-part="item-title">
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

TreeNodeItem.displayName = 'Tree.Node'
