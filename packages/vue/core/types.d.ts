/// <reference types="@rslib/core/types" />

declare type EventDetails<T> = {
  originalEvent: T
  contextmenu: boolean
  focusable: boolean
  target: EventTarget
}

declare type LayerDismissEventDetail = {
  originalLayer: HTMLElement
  targetLayer: HTMLElement | undefined
  originalIndex: number
  targetIndex: number
}

declare type Placement = 'top-start' | 'top' | 'top-end' | 'bottom-start' | 'bottom' | 'bottom-end'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}
