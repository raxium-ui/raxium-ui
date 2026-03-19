import type { MaybeElement } from '@vueuse/core'
import type {
  DraggerCancelEvent,
  DraggerEndEvent,
  DraggerMoveEvent,
  DraggerStartEvent,
  GridEvents,
  GridOptions,
  Item,
  LayoutData,
  LayoutFunction,
  ScrollEvent,
} from 'muuri'
import type { MaybeRef, MaybeRefOrGetter, ShallowRef } from 'vue'
import { tryOnMounted, tryOnScopeDispose, unrefElement } from '@vueuse/core'
import { camelCase, forEach, isEmpty, omit, pickBy } from 'es-toolkit/compat'
import Grid from 'muuri'
import { isRef, nextTick, shallowRef, toValue } from 'vue'

export type UseMuuriOpitons = GridOptions & {
  onSynchronize?: () => any
  onLayoutStart?: (items: Item[], isInstant: boolean) => any
  onLayoutEnd?: (items: Item[]) => any
  onLayoutAbort?: (items: Item[]) => any
  onAdd?: (items: Item[]) => any
  onRemove?: (items: Item[], indices: number[]) => any
  onShowStart?: (items: Item[]) => any
  onShowEnd?: (items: Item[]) => any
  onHideStart?: (items: Item[]) => any
  onHideEnd?: (items: Item[]) => any
  onFilter?: (shownItems: Item[], hiddenItems: Item[]) => any
  onSort?: (currentOrder: Item[], previousOrder: Item[]) => any
  onMove?: (data: {
    item: Item
    fromIndex: number
    toIndex: number
    action: 'move' | 'swap'
  }) => any
  onSend?: (data: {
    item: Item
    fromGrid: Grid
    fromIndex: number
    toGrid: Grid
    toIndex: number
  }) => any
  onBeforeSend?: (data: {
    item: Item
    fromGrid: Grid
    fromIndex: number
    toGrid: Grid
    toIndex: number
  }) => any
  onReceive?: (data: {
    item: Item
    fromGrid: Grid
    fromIndex: number
    toGrid: Grid
    toIndex: number
  }) => any
  onBeforeReceive?: (data: {
    item: Item
    fromGrid: Grid
    fromIndex: number
    toGrid: Grid
    toIndex: number
  }) => any
  onDragInit?: (item: Item, event: DraggerStartEvent | DraggerMoveEvent) => any
  onDragStart?: (item: Item, event: DraggerStartEvent | DraggerMoveEvent) => any
  onDragMove?: (item: Item, event: DraggerMoveEvent) => any
  onDragScroll?: (item: Item, event: ScrollEvent) => any
  onDragEnd?: (item: Item, event: DraggerEndEvent | DraggerCancelEvent) => any
  onDragReleaseStart?: (item: Item) => any
  onDragReleaseEnd?: (item: Item) => any
  onDestroy?: () => any
}

export function useMuuri<T>(
  selector: string,
  list: MaybeRef<T[]>,
  options?: UseMuuriOpitons,
): {
  start: () => void
  stop: () => void
  grid: ShallowRef<Grid | null>
}

export function useMuuri<T>(
  el: MaybeRefOrGetter<MaybeElement>,
  list: MaybeRef<T[]>,
  options?: UseMuuriOpitons,
): {
  start: () => void
  stop: () => void
  grid: ShallowRef<Grid | null>
}

/**
 * we build useMuuri to instand of useSortable which in vueuse
 * because in some env, we cannot get 'drag' event
 * Notice: useMuuri MUST comply with muuri css rules see: https://docs.muuri.dev/getting-started.html#_4-add-the-styles
 * Thanks to muuri.js
 * @param el
 * @param list
 * @param options
 * @returns
 */
export function useMuuri<T>(
  el: MaybeRefOrGetter<MaybeElement> | string,
  list: MaybeRef<T[]>,
  options?: UseMuuriOpitons,
) {
  const grid = shallowRef<Grid | null>(null)

  const defaultLayout: LayoutFunction = (grid, layoutId, items, width, height, callback) => {
    const layout: LayoutData = {
      id: layoutId,
      items,
      slots: [],
      styles: {},
    }
    let y = 0
    let h = 0
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (!item)
        continue
      const itemH = item.getHeight()
      const itemM = item.getMargin()
      y += h
      if (itemH <= 0) {
        item!.getElement()!.style.visibility = 'hidden'
      }
      else {
        item!.getElement()!.style.visibility = 'visible'
      }
      h = itemH + itemM.top + itemM.bottom
      layout.slots.push(0, y)
    }
    h += y
    layout.styles = {
      width: '100%',
      height: `${h}px`,
    }
    callback(layout)
  }

  const _defaultOptions: Partial<UseMuuriOpitons> = {
    layout: defaultLayout,
    dragEnabled: true,
    dragHandle: '.rui-muuri-handle',
    dragAxis: 'y',
    dragSortHeuristics: {
      sortInterval: 0,
      minDragDistance: 5,
      minBounceBackAngle: Math.PI / 2,
    },
    dragPlaceholder: {
      enabled: true,
      createElement: () => {
        const placeholder = document.createElement('div')
        placeholder.setAttribute('class', 'rui-muuri-placeholder')
        const inner = document.createElement('div')
        inner.setAttribute('class', 'rui-muuri-placeholder-inner')
        placeholder.appendChild(inner)
        return placeholder
      },
      onCreate(_, element: HTMLElement) {
        const inner = element.querySelector('.rui-muuri-placeholder-inner') as HTMLElement
        if (inner) {
          inner.style.height = `${parseInt(element.style.height)}px`
        }
      },
    },
    onMove: (data) => {
      const { fromIndex, toIndex } = data
      const _valueIsRef = isRef(list)
      // When the list is a ref, make a shallow copy of it to avoid repeatedly triggering side effects when moving elements
      const array = _valueIsRef ? [...toValue(list)] : toValue(list)
      if (toIndex >= 0 && toIndex < array.length) {
        const element = array.splice(fromIndex, 1)[0]
        nextTick(() => {
          array.splice(toIndex, 0, element)
          // When list is ref, assign array to list.value
          if (_valueIsRef)
            (list as MaybeRef).value = array
        })
      }
      options?.onMove?.(data)
    },
  }

  const start = () => {
    const _options = { ..._defaultOptions, ...omit(options ?? {}, ['onMove']) }
    const target = typeof el === 'string' ? el : unrefElement(el)

    if (!target || (typeof target !== 'string' && !(target instanceof HTMLElement)))
      return

    grid.value = new Grid(target, _options)
    const _events = pickBy(_options, (_, key) => key.startsWith('on'))
    if (!isEmpty(_events)) {
      forEach(_events, (value, key) => {
        const _key = camelCase(key.replace('on', ''))
        grid.value?.on(_key as keyof GridEvents, value as any)
      })
    }
  }

  const stop = () => {
    grid.value?.destroy()
    grid.value = null
  }

  tryOnMounted(start)
  tryOnScopeDispose(stop)

  return {
    grid,
    start,
    stop,
  }
}
