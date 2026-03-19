import type { VNode, VNodeChild } from 'vue'
import { camelCase, isEmpty } from 'es-toolkit/compat'
import { isVNode } from 'vue'

export function someVNode(
  children: VNodeChild | VNodeChild[] | undefined,
  pred: (v: VNode) => boolean,
): boolean {
  const arr = Array.isArray(children) ? children : children != null ? [children] : []
  for (const n of arr) {
    if (n && typeof n === 'object') {
      const v = n as VNode
      if (pred(v))
        return true
      // 只递归“数组 children”（最常见：Fragment 的 children）
      if (Array.isArray(v.children) && someVNode(v.children, pred))
        return true
    }
  }
  return false
}

export function findVNodeByName(nodes: VNode[] | undefined, name: string): VNode | undefined {
  const target = camelCase(name)
  if (isEmpty(nodes))
    return undefined
  for (const n of nodes!) {
    if (!n || !n.type)
      continue
    if (typeof n.type === 'symbol' && Array.isArray(n.children)) {
      // is a slot node
      return findVNodeByName(n.children as VNode[], name)
    }
    const tName = (n.type as any).name || (n.type as any).__name
    if (!tName)
      continue
    if (camelCase(tName) === target)
      return n
  }
  return undefined
}

export function findVNodesByName(nodes: VNode[] | undefined, name: string): VNode[] {
  const target = camelCase(name)
  const result: VNode[] = []
  if (isEmpty(nodes))
    return []
  for (const n of nodes!) {
    if (!n || !n.type)
      continue
    if (typeof n.type === 'symbol' && Array.isArray(n.children)) {
      // is a slot node
      result.push(...findVNodesByName(n.children as VNode[], name))
      continue
    }
    const tName = (n.type as any).name || (n.type as any).__name
    if (camelCase(tName) === target)
      result.push(n)
  }
  return result
}

export function excludeVNodesByName(node: VNode | VNode[] | undefined, name: string): VNode[] {
  if (!node)
    return []
  return excludeVNodesByNames(Array.isArray(node) ? node : [node], [camelCase(name)])
}
export function excludeVNodesByNames(nodes: VNode[] | undefined, name: string[]): VNode[] {
  const targets = name.map(camelCase)
  const result: VNode[] = []
  if (isEmpty(nodes))
    return []
  for (const n of nodes!) {
    if (!n || !n.type)
      continue
    if (typeof n.type === 'symbol' && Array.isArray(n.children)) {
      // is a slot node
      result.push(...excludeVNodesByNames(n.children as VNode[], name))
      continue
    }
    const tName = (n.type as any).name || (n.type as any).__name
    if (!targets.includes(camelCase(tName)))
      result.push(n)
  }
  return result
}

export function hasChildVNodeByName(node: VNode | VNode[] | undefined, name: string): boolean {
  if (!node)
    return false
  if (Array.isArray(node)) {
    return node.some(n => hasChildVNodeByName(n, name))
  }
  const target = camelCase(name)
  const nodeName = (node.type as any).name || (node.type as any).__name
  if (camelCase(nodeName) === target)
    return true
  if (Array.isArray(node.children)) {
    for (const n of node.children) {
      if (!isVNode(n))
        continue
      if (typeof n.type === 'symbol' && Array.isArray(n.children)) {
        // is a slot node
        return hasChildVNodeByName(n, name)
      }
      const tName = (n.type as any).name || (n.type as any).__name
      if (camelCase(tName) === target)
        return true
    }
  }
  return false
}

export function checkContextVNodePosition(
  nodes: VNode[] | undefined,
  contextName: string,
  componentName?: string,
) {
  if (!nodes)
    return
  if (nodes.length === 1) {
    const _targetName = camelCase(contextName)
    const _srcName = camelCase((nodes[0].type as any).name || (nodes[0].type as any).__name)
    _srcName === _targetName
    && console.warn(
      `\<${contextName}\> can not be a direct child of \<${componentName}\>, it may cause unexpected style behavior, consider lift it up or use it closer to where you want to use it `,
    )
  }
}
