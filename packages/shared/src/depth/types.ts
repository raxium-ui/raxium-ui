export type DepthOwnerType =
  | 'dialog'
  | 'popover'
  | 'menu'
  | 'hover-card'
  | 'floating-panel'

export type DepthFloatingType =
  | 'tooltip'
  | 'popover'
  | 'menu'
  | 'hover-card'
  | 'floating-panel'

export interface DepthOwnerRecord {
  id: string
  type: DepthOwnerType
}

export interface DepthFloatingRecord {
  id: string
  type: DepthFloatingType
  ownerId?: string
}

export interface DepthRootRecord {
  id: string
  kind: 'owner' | 'floating'
}
