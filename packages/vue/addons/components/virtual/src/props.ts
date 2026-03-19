import type { Virtualizer, VirtualizerOptions } from '@tanstack/vue-virtual'
import type { Ref, ShallowRef } from 'vue'

export interface VirtualContext {
  parentEl?: Ref<Element | null | undefined>
  // virtualizer for list
  virtualizer?: ShallowRef<Virtualizer<Element, Element>>
  // row virtualizer for grid
  rowVirtualizer?: ShallowRef<Virtualizer<Element, Element>>
  // column virtualizer for grid
  columnVirtualizer?: ShallowRef<Virtualizer<Element, Element>>
  enableInfinite: Ref<boolean>
  infiniteState: Ref<LOADING_STATE>
}

export interface VirtualListProps<T>
  extends Omit<
    VirtualizerOptions<Element, Element>,
    | 'enabled'
    | 'count'
    | 'getScrollElement'
    | 'estimateSize'
    | 'scrollToFn'
    | 'observeElementRect'
    | 'observeElementOffset'
  > {
  dataSource: Array<T>
  estimateSize?: VirtualizerOptions<Element, Element>['estimateSize']
  scrollToFn?: VirtualizerOptions<Element, Element>['scrollToFn']
  observeElementRect?: VirtualizerOptions<Element, Element>['observeElementRect']
  observeElementOffset?: VirtualizerOptions<Element, Element>['observeElementOffset']
}

export interface VirtualGridProps<T> {
  dataSource: Array<T>
  row?: number
  column?: number
  gap?: [number, number]
  rowVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
  columnVirtualizerOptions?: Omit<VirtualListProps<T>, 'dataSource'>
}

export enum LOADING_STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  LOADED = 'loaded',
  COMPLETE = 'complete',
  ERROR = 'error',
}

export interface LoadingStateHandler {
  loading: () => void
  loaded: () => void
  complete: () => void
  error: () => void
}
