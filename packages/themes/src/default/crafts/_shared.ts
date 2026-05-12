/**
 * Shared animation class constants for popover-like components.
 * Used by: menu, select, tooltip, popover, hover-card, date-picker
 */

/** Open/close motion with scale + directional translate based on placement */
export const POPOVER_MOTION = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=open]:motion-scale-in-95',
  'data-[state=open]:data-[placement^=bottom]:motion-translate-y-in-[.25rem]',
  'data-[state=open]:data-[placement^=top]:-motion-translate-y-in-[.25rem]',
  'data-[state=open]:data-[placement^=left]:-motion-translate-x-in-[.25rem]',
  'data-[state=open]:data-[placement^=right]:motion-translate-x-in-[.25rem]',
  'data-[state=closed]:motion-opacity-out',
  'data-[state=closed]:motion-scale-out-95',
  'data-[state=closed]:data-[placement^=bottom]:motion-translate-y-out-[.25rem]',
  'data-[state=closed]:data-[placement^=top]:-motion-translate-y-out-[.25rem]',
  'data-[state=closed]:data-[placement^=left]:-motion-translate-x-out-[.25rem]',
  'data-[state=closed]:data-[placement^=right]:motion-translate-x-out-[.25rem]',
] as const

/**
 * Shared animation for dialog/modal backdrop.
 * Used by: dialog
 */
export const DIALOG_BACKDROP_MOTION = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=open]:animate-backdrop-blur-in',
  'data-[state=closed]:motion-opacity-out',
  'data-[state=closed]:animate-backdrop-blur-out',
] as const

/**
 * Shared animation for dialog/modal content (slide-in/out).
 * Used by: dialog
 */
export const DIALOG_CONTENT_MOTION = [
  'data-[state=open]:motion-opacity-in',
  'data-[state=open]:motion-translate-y-in',
  'data-[state=closed]:motion-opacity-out',
  'data-[state=closed]:motion-translate-y-out',
] as const

/**
 * Shared animation for collapsible content (height expand/collapse).
 * Used by: accordion, collapsible, tree-branch
 */
export const COLLAPSIBLE_CONTENT_MOTION = [
  'overflow-hidden',
  'data-[state=open]:animate-collapsible-down',
  'data-[state=closed]:animate-collapsible-up',
] as const

/**
 * Shared trigger indicator rotation for collapsible-like components.
 * Used by: accordion, collapsible
 */
export const COLLAPSIBLE_INDICATOR = [
  'data-[state=closed]:rotate-0',
  'data-[state=open]:rotate-180',
  'transition-transform',
] as const

/**
 * Shared popover content slot base classes (rounded + motion).
 * Used by: tooltip, hover-card, popover, menu, select, date-picker
 */
export const POPOVER_CONTENT_BASE = [
  'rounded-(--border-radius)',
  ...POPOVER_MOTION,
] as const

/**
 * Shared popover content inner slot base classes.
 * Used by: tooltip, hover-card, popover, menu, select, date-picker
 */
export const POPOVER_CONTENT_INNER_BASE = [
  'relative',
  'rounded-(--border-radius)',
  'z-10',
] as const
