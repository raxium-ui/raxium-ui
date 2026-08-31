export type MotionMode = 'default' | 'fade' | 'none'

/** Placement-aware scale + fade + translate (popover family default). */
export const popoverMotion = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=open]:motion-scale-in-[var(--rui-motion-scale)]',
  'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[var(--rui-motion-offset)]',
  'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[var(--rui-motion-offset)]',
  'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[var(--rui-motion-offset)]',
  'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[var(--rui-motion-offset)]',
  'data-[state=closed]:motion-opacity-out',
  'data-[state=closed]:motion-scale-out-[var(--rui-motion-scale)]',
  'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[var(--rui-motion-offset)]',
  'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[var(--rui-motion-offset)]',
  'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[var(--rui-motion-offset)]',
  'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[var(--rui-motion-offset)]',
]

export const fadeMotion = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=closed]:motion-opacity-out',
]

/** Single `animation` — opacity lives in the blur keyframes (cannot compose with `motion-opacity-*`). */
export const dialogBackdropMotion = [
  'data-[state=open]:animate-backdrop-blur-in',
  'data-[state=closed]:animate-backdrop-blur-out',
]

export const dialogContentMotion = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=open]:motion-translate-y-in-[var(--rui-motion-offset)]',
  'data-[state=closed]:motion-opacity-out',
  'data-[state=closed]:motion-translate-y-out-[var(--rui-motion-offset)]',
]

export const collapsibleContentMotion = [
  'data-[state=open]:animate-collapsible-down',
  'data-[state=closed]:animate-collapsible-up',
]

export const collapsibleIndicator = [
  'data-[state=closed]:rotate-0',
  'data-[state=open]:rotate-180',
  'transition-transform',
]

export const treeBranchIndicator = [
  'data-[state=open]:rotate-90',
  'data-[state=closed]:rotate-0',
  'transition-transform',
]

export const popoverIndicatorMotion = [
  'data-[state=open]:motion-rotate-out-180',
  'data-[state=closed]:motion-rotate-in-180',
]

/** Horizontal slide on tab change; no `data-direction` = first paint, no motion. */
export const tabsPanelMotion = [
  'data-[state=open]:data-[orientation=horizontal]:data-[direction=prev]:-motion-translate-x-in',
  'data-[state=open]:data-[orientation=horizontal]:data-[direction=next]:motion-translate-x-in',
  'data-[state=open]:data-[orientation=horizontal]:data-[direction=prev]:motion-opacity-in',
  'data-[state=open]:data-[orientation=horizontal]:data-[direction=next]:motion-opacity-in',
]

export const tabsPanelFadeMotion = [
  'data-[state=open]:data-[direction=prev]:motion-opacity-in',
  'data-[state=open]:data-[direction=next]:motion-opacity-in',
]

export const radioScaleMotion = ['data-[variant=default]:motion-scale-in-0']

export const radioFadeMotion = ['data-[variant=default]:motion-opacity-in']

export const radioCheckboxMotion = ['data-[variant=checkbox]:[&>path]:animate-check-dash']

const noMotion: string[] = []

export const overlayMotionVariants = {
  default: { content: popoverMotion },
  fade: { content: fadeMotion },
  none: { content: noMotion },
}

/** Overlay content plus trigger chevron; `none` stops both. */
export const popoverMotionVariants = {
  default: { content: popoverMotion, indicator: popoverIndicatorMotion },
  fade: { content: fadeMotion, indicator: popoverIndicatorMotion },
  none: { content: noMotion, indicator: noMotion },
}

export const tabsMotionVariants = {
  default: { content: tabsPanelMotion },
  fade: { content: tabsPanelFadeMotion },
  none: { content: noMotion },
}

export const radioMotionVariants = {
  default: { itemIndicator: [...radioScaleMotion, ...radioCheckboxMotion] },
  fade: { itemIndicator: radioFadeMotion },
  none: { itemIndicator: noMotion },
}

export const dialogMotionVariants = {
  default: {
    backdrop: dialogBackdropMotion,
    content: dialogContentMotion,
  },
  fade: {
    backdrop: fadeMotion,
    content: fadeMotion,
  },
  none: {
    backdrop: noMotion,
    content: noMotion,
  },
}

export const collapsibleMotionVariants = {
  default: {
    content: collapsibleContentMotion,
    indicator: collapsibleIndicator,
  },
  fade: {
    content: fadeMotion,
    indicator: collapsibleIndicator,
  },
  none: {
    content: noMotion,
    indicator: noMotion,
  },
}

export const treeBranchMotionVariants = {
  default: {
    content: collapsibleContentMotion,
    indicator: treeBranchIndicator,
  },
  fade: {
    content: fadeMotion,
    indicator: treeBranchIndicator,
  },
  none: {
    content: noMotion,
    indicator: noMotion,
  },
}

/** @deprecated Use `popoverMotion`. */
export const POPOVER_MOTION = popoverMotion
/** @deprecated Use `dialogBackdropMotion`. */
export const DIALOG_BACKDROP_MOTION = dialogBackdropMotion
/** @deprecated Use `dialogContentMotion`. */
export const DIALOG_CONTENT_MOTION = dialogContentMotion
/** @deprecated Use `collapsibleContentMotion`. Height recipe only; `overflow-hidden` lives on each craft's content slot. */
export const COLLAPSIBLE_CONTENT_MOTION = collapsibleContentMotion
/** @deprecated Use `collapsibleIndicator`. */
export const COLLAPSIBLE_INDICATOR = collapsibleIndicator
