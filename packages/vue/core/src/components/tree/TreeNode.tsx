import type { UseTreeViewNodeContext } from '@ark-ui/vue'
import type { h, HTMLAttributes, PropType, SlotsType, UnwrapRef, VNode } from 'vue'
import type { TreeKeyMap, TreeNodeData } from './props'
import { TreeView } from '@ark-ui/vue'
import { clsx } from '@raxium/themes/utils'
import { Icon } from '@raxium/vue/components/icon'
import { useTheme } from '@raxium/vue/composables/useTheme'
import { ChevronRight } from 'lucide-vue-next'
import { cloneVNode, computed, defineComponent, isVNode, toRefs, unref } from 'vue'
import { TreeNode } from '.'
import { injectTreeContext } from './tree-context'

/** 合并 keyMap 后的完整类型（用于 slots） */
interface ResolvedKeyMap {
  id: string
  name: string
  children: string
  icon: string
}

type RenderIconProps = {
  icon: string | VNode | Function
  node: TreeNodeData
  state: UnwrapRef<UseTreeViewNodeContext>
  class: HTMLAttributes['class']
}
type RenderIcon = (props: RenderIconProps) => ReturnType<typeof h>

type RenderNameProps = {
  name: string | VNode | Function
  node: TreeNodeData
  state: UnwrapRef<UseTreeViewNodeContext>
}
type RenderName = (props: RenderNameProps) => ReturnType<typeof h> | string

export default defineComponent({
  name: 'TreeNode',
  props: {
    ui: {
      type: Object as PropType<{
        branch?: HTMLAttributes['class']
        branchControl?: HTMLAttributes['class']
        branchTitle?: HTMLAttributes['class']
        branchIcon?: HTMLAttributes['class']
        branchText?: HTMLAttributes['class']
        branchIndicator?: HTMLAttributes['class']
        branchContent?: HTMLAttributes['class']
        branchIndentGuide?: HTMLAttributes['class']
        item?: HTMLAttributes['class']
        itemTitle?: HTMLAttributes['class']
        itemIcon?: HTMLAttributes['class']
        itemText?: HTMLAttributes['class']
      }>,
      default: () => ({}),
    },
    node: {
      type: Object as PropType<TreeNodeData>,
      default: () => ({}),
      required: true,
    },
    nodeIndent: {
      type: Number,
    },
    indexPath: {
      type: Array as PropType<number[]>,
      default: () => [],
      required: true,
    },
    keyMap: {
      type: Object as PropType<Partial<TreeKeyMap>>,
      default: () => ({
        id: 'id',
        name: 'name',
        children: 'children',
        icon: 'icon',
      }),
    },

    renderIcon: {
      type: Function as PropType<RenderIcon>,
      default: (props: RenderIconProps) => {
        if (typeof props.icon === 'string') {
          return <Icon class={props.class} icon={props.icon} />
        }
        if (isVNode(props.icon)) {
          return cloneVNode(props.icon, { class: props.class })
        }
        if (typeof props.icon === 'function') {
          return props.icon(props)
        }
        return <></>
      },
    },

    renderName: {
      type: Function as PropType<RenderName>,
      default: (props: RenderNameProps) => {
        if (typeof props.name === 'string' || isVNode(props.name)) {
          return props.name
        }
        if (typeof props.name === 'function') {
          return props.name(props)
        }
        return ''
      },
    },
  },

  slots: Object as SlotsType<{
    branch: (props: {
      node: TreeNodeData
      keyMap: ResolvedKeyMap
      state: UnwrapRef<UseTreeViewNodeContext>
    }) => any
    item: (props: {
      node: TreeNodeData
      keyMap: ResolvedKeyMap
      state: UnwrapRef<UseTreeViewNodeContext>
    }) => any
  }>,

  setup(props, { attrs, slots }) {
    const { node, nodeIndent, indexPath, keyMap, ui } = toRefs(props)
    const theme = useTheme()
    const { branchCrafts, itemCrafts } = injectTreeContext()

    const branchClx = computed(() => {
      return {
        root: branchCrafts.value.root({
          class: clsx(ui.value?.branch, attrs.class),
          ...theme.value,
        }),
        control: branchCrafts.value.control({
          class: clsx(ui.value?.branchControl),
          ...theme.value,
        }),
        title: branchCrafts.value.title({
          class: clsx(ui.value?.branchTitle),
          ...theme.value,
        }),
        text: branchCrafts.value.text({
          class: clsx(ui.value?.branchText),
          ...theme.value,
        }),
        indicator: branchCrafts.value.indicator({
          class: clsx(ui.value?.branchIndicator),
          ...theme.value,
        }),
        content: branchCrafts.value.content({
          class: clsx(ui.value?.branchContent),
          ...theme.value,
        }),
        icon: branchCrafts.value.icon({
          class: clsx(ui.value?.branchIcon),
          ...theme.value,
        }),
      }
    })

    const itemClx = computed(() => {
      return {
        root: itemCrafts.value.root({
          class: clsx(ui.value?.item, attrs.class),
          ...theme.value,
        }),
        title: itemCrafts.value.title({
          class: clsx(ui.value?.itemTitle),
          ...theme.value,
        }),
        text: itemCrafts.value.text({
          class: clsx(ui.value?.itemText),
          ...theme.value,
        }),
        icon: itemCrafts.value.icon({
          class: clsx(ui.value?.itemIcon),
          ...theme.value,
        }),
      }
    })

    const mergedKeyMap = computed(() => {
      return Object.assign(
        {
          id: 'id',
          name: 'name',
          children: 'children',
          icon: 'icon',
        },
        keyMap.value,
      )
    })

    return () => {
      const uNode = unref(node)
      const uIndexPath = unref(indexPath)
      const uKeyMap = unref(mergedKeyMap)

      return (
        <TreeView.NodeProvider node={uNode} indexPath={uIndexPath}>
          <TreeView.NodeContext>
            {{
              default: (nodeState: UnwrapRef<UseTreeViewNodeContext>) => (
                <>
                  {uNode[uKeyMap.children] && (
                    <TreeView.Branch
                      {...attrs}
                      class={branchClx.value.root}
                      style={
                        unref(nodeIndent) ? { '--indent': `${unref(nodeIndent)}px` } : undefined
                      }
                    >
                      <TreeView.BranchControl
                        class={branchClx.value.control}
                      >
                        {slots.branch
                          ? (
                              slots.branch({
                                node: uNode,
                                keyMap: uKeyMap,
                                state: nodeState,
                              })
                            )
                          : (
                              <>
                                <div
                                  class={branchClx.value.title}
                                  data-scope="tree-view"
                                  data-part="branch-title"
                                >
                                  {props.renderIcon({
                                    node: uNode,
                                    icon: uNode[uKeyMap.icon] as any,
                                    state: nodeState,
                                    class: branchClx.value.icon,
                                  })}
                                  <TreeView.BranchText
                                    class={branchClx.value.text}
                                  >
                                    {props.renderName({
                                      name: uNode[uKeyMap.name] as any,
                                      node: uNode,
                                      state: nodeState,
                                    })}
                                  </TreeView.BranchText>
                                </div>
                                <TreeView.BranchIndicator
                                  class={branchClx.value.indicator}
                                >
                                  <ChevronRight style={{ width: '1lh', height: '1lh' }} />
                                </TreeView.BranchIndicator>
                              </>
                            )}
                      </TreeView.BranchControl>
                      <TreeView.BranchContent
                        class={branchClx.value.content}
                      >
                        <TreeView.BranchIndentGuide />
                        {(uNode[uKeyMap.children] as TreeNodeData[]).map((child, index) => {
                          return (
                            <TreeNode
                              key={child[uKeyMap.id] as string}
                              node={child}
                              indexPath={[...uIndexPath, index]}
                              keyMap={uKeyMap}
                              renderIcon={props.renderIcon}
                              renderName={props.renderName}
                            />
                          )
                        })}
                      </TreeView.BranchContent>
                    </TreeView.Branch>
                  )}
                  {!uNode[uKeyMap.children] && (
                    <TreeView.Item
                      {...attrs}
                      class={itemClx.value.root}
                    >
                      {slots.item
                        ? (
                            slots.item({
                              node: uNode,
                              keyMap: uKeyMap,
                              state: nodeState,
                            })
                          )
                        : (
                            <div
                              class={itemClx.value.title}
                              data-scope="tree-view"
                              data-part="item-title"
                            >
                              {props.renderIcon({
                                node: uNode,
                                icon: uNode[uKeyMap.icon] as any,
                                state: nodeState,
                                class: itemClx.value.icon,
                              })}
                              <TreeView.ItemText
                                class={itemClx.value.text}
                              >
                                {props.renderName({
                                  name: uNode[uKeyMap.name] as any,
                                  node: uNode,
                                  state: nodeState,
                                })}
                              </TreeView.ItemText>
                            </div>
                          )}
                    </TreeView.Item>
                  )}
                </>
              ),
            }}
          </TreeView.NodeContext>
        </TreeView.NodeProvider>
      )
    }
  },
})
