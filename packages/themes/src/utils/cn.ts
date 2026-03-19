import type { ClassValue } from 'clsx'
import clsx from 'clsx'

export function cn(...classes: ClassValue[]) {
  return cn(clsx(...classes))
}

export function cnMerge(...classes: ClassValue[]) {
  return cnMerge(clsx(...classes))
}

export function cx(...classes: ClassValue[]) {
  return cx(clsx(...classes))
}
