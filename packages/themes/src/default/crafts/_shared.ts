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
