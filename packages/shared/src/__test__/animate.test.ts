import { describe, expect, it, vi } from 'vitest'
import { parseCubicBezier } from '../animate'

describe('parseCubicBezier', () => {
  it('parses four numeric control points', () => {
    expect(parseCubicBezier('cubic-bezier(0.4, 0, 0.2, 1)')).toEqual([0.4, 0, 0.2, 1])
    expect(parseCubicBezier('cubic-bezier(0.42, 0.0, 0.58, 1.0)')).toEqual([0.42, 0, 0.58, 1])
  })

  it('returns zeros and warns on malformed input', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(parseCubicBezier('ease')).toEqual([0, 0, 0, 0])
    expect(parseCubicBezier('cubic-bezier(1, 2)')).toEqual([0, 0, 0, 0])
    expect(parseCubicBezier('cubic-bezier(a, b, c, d)')).toEqual([0, 0, 0, 0])
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
