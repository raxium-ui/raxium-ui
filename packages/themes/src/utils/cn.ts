import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

/** clsx + twMerge，统一处理 class 类型并合并 Tailwind 冲突 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

export function cnMerge(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

export function cx(...classes: ClassValue[]) {
  return clsx(...classes)
}

export { clsx }
