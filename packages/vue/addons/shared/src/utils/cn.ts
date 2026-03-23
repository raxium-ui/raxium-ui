import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(...classes))
}

export function cx(...classes: ClassValue[]) {
  return clsx(...classes)
}

export { clsx }
