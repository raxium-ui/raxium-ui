import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Builds `{ class }` for tailwind-variants slot calls (`craft.slot({ class, ...variants })`).
 * Accepts Vue `HTMLAttributes['class']` / `clsx` `ClassValue` pieces and merges them with `clsx`
 * so the result satisfies TV's narrower `ClassNameValue` expectation without verbose `{ class: clsx(...) }`.
 */
export function cxc(...parts: ClassValue[]): { class: string } {
  return { class: clsx(...parts) }
}

/** clsx + twMerge，统一处理 class 类型并合并 Tailwind 冲突 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

/** @deprecated Use `cn` instead */
export const cnMerge = cn

export function cx(...classes: ClassValue[]) {
  return clsx(...classes)
}

export { clsx }
