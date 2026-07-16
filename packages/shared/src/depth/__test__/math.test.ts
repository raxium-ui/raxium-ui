import { describe, expect, it } from 'vitest'
import { addZIndexOffset, DEFAULT_DEPTH_BASE_VAR, DEFAULT_DEPTH_STEP, zIndexAt } from '../math'

describe('zIndexAt', () => {
  it('builds calc(base + index*step + offset)', () => {
    expect(zIndexAt(0, 0, DEFAULT_DEPTH_BASE_VAR, DEFAULT_DEPTH_STEP))
      .toBe('calc(var(--z-modal) + 0)')
    expect(zIndexAt(2, 1, 'var(--z-modal)', 10))
      .toBe('calc(var(--z-modal) + 21)')
  })
})

describe('addZIndexOffset', () => {
  it('returns the original expression when offset is 0', () => {
    expect(addZIndexOffset('calc(var(--z-modal) + 10)', 0)).toBe('calc(var(--z-modal) + 10)')
  })

  it('wraps with an outer calc when offset is non-zero', () => {
    expect(addZIndexOffset('calc(var(--z-modal) + 10)', 2))
      .toBe('calc(calc(var(--z-modal) + 10) + 2)')
  })
})
