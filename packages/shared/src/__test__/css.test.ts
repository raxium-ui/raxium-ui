import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { alignPx, getCssColor, getCssVar, getNodeCssVar, px2rem, rem2px, spaceTimes } from '../css'

describe('px2rem / rem2px', () => {
  beforeEach(() => {
    document.documentElement.style.fontSize = '16px'
  })

  afterEach(() => {
    document.documentElement.style.fontSize = ''
  })

  it('converts px ↔ rem using root font-size', () => {
    expect(px2rem(32)).toBe(2)
    expect(px2rem('32px')).toBe(2)
    expect(px2rem('2rem')).toBe(2)
    expect(rem2px(2)).toBe(32)
    expect(rem2px('2rem')).toBe(32)
    expect(rem2px('32px')).toBe(32)
  })

  it('treats empty / zero-ish input as 0', () => {
    expect(px2rem(0)).toBe(0)
    expect(rem2px(0)).toBe(0)
  })
})

describe('alignPx', () => {
  it('snaps to device pixels when round=true', () => {
    // round=true: Math.round(Math.round(px*dpr)/dpr) → integer CSS px
    expect(alignPx(10.4, 2, true)).toBe(11)
    // round=false: keep fractional CSS px aligned to device grid
    expect(alignPx(10.4, 2, false)).toBe(10.5)
  })
})

describe('getNodeCssVar / getCssVar / getCssColor', () => {
  afterEach(() => {
    document.documentElement.style.cssText = ''
    document.body.replaceChildren()
  })

  it('reads a plain custom property', () => {
    document.documentElement.style.setProperty('--color-brand', '#112233')
    expect(getNodeCssVar(null, '--color-brand')).toBe('#112233')
    expect(getCssColor('brand')).toBe('#112233')
  })

  it('returns fallback when missing', () => {
    expect(getNodeCssVar(null, '--missing', 'fallback')).toBe('fallback')
    expect(getCssVar('--missing', 'x')).toBe('x')
  })

  it('resolves rem / calc-like dynamic values to px via a probe element', () => {
    document.documentElement.style.fontSize = '16px'
    document.documentElement.style.setProperty('--gap', '1rem')
    expect(getNodeCssVar(null, '--gap')).toBe('16')
  })
})

describe('spaceTimes', () => {
  afterEach(() => {
    document.documentElement.style.cssText = ''
  })

  it('multiplies resolved --spacing (rem → px) by times', () => {
    document.documentElement.style.fontSize = '16px'
    document.documentElement.style.setProperty('--spacing', '0.25rem')
    expect(spaceTimes(4)).toBe(16)
  })

  it('falls back to .25rem when --spacing is unset', () => {
    document.documentElement.style.fontSize = '16px'
    expect(spaceTimes(4)).toBe(16)
  })
})
