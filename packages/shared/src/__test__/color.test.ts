import { describe, expect, it } from 'vitest'
import {
  colorHex2Rgb,
  colorHex2RgbObject,
  colorLab2RgbObject,
  colorRgbStr2RgbObject,
  detectCssColorType,
} from '../color'

describe('colorHex2Rgb', () => {
  it('expands short hex to rgb', () => {
    expect(colorHex2Rgb('#f00')).toBe('rgb(255, 0, 0)')
    expect(colorHex2Rgb('0f0')).toBe('rgb(0, 255, 0)')
  })

  it('converts long hex and hexa', () => {
    expect(colorHex2Rgb('#00ff00')).toBe('rgb(0, 255, 0)')
    expect(colorHex2Rgb('#0000ff80')).toBe('rgba(0, 0, 255, 0.50)')
  })

  it('throws on invalid length', () => {
    expect(() => colorHex2Rgb('#ff')).toThrow(/Invalid HEX/)
  })
})

describe('colorRgbStr2RgbObject / colorHex2RgbObject', () => {
  it('parses rgb and rgba strings', () => {
    expect(colorRgbStr2RgbObject('rgb(1, 2, 3)')).toEqual({ r: 1, g: 2, b: 3, a: undefined })
    expect(colorRgbStr2RgbObject('rgba(1, 2, 3, 0.5)')).toEqual({ r: 1, g: 2, b: 3, a: 0.5 })
  })

  it('chains hex → rgb object', () => {
    expect(colorHex2RgbObject('#112233')).toEqual({ r: 17, g: 34, b: 51, a: undefined })
  })

  it('throws on invalid rgb string', () => {
    expect(() => colorRgbStr2RgbObject('not-a-color')).toThrow(/Invalid RGB/)
  })
})

describe('colorLab2RgbObject', () => {
  it('maps neutral mid Lab toward mid gray sRGB', () => {
    const rgb = colorLab2RgbObject({ l: 50, a: 0, b: 0 })
    expect(rgb.r).toBeGreaterThan(100)
    expect(rgb.r).toBeLessThan(140)
    expect(rgb.g).toBe(rgb.r)
    expect(rgb.b).toBe(rgb.r)
    expect(rgb.a).toBeUndefined()
  })

  it('clamps alpha into 0..1 when provided', () => {
    expect(colorLab2RgbObject({ l: 50, a: 0, b: 0, alpha: 2 }).a).toBe(1)
    expect(colorLab2RgbObject({ l: 50, a: 0, b: 0, alpha: -1 }).a).toBe(0)
  })
})

describe('detectCssColorType', () => {
  it('detects hex / hexa', () => {
    expect(detectCssColorType('#abc').type).toBe('hex')
    expect(detectCssColorType('#aabbccdd').type).toBe('hexa')
  })

  it('detects rgb / rgba', () => {
    expect(detectCssColorType('rgb(1, 2, 3)').type).toBe('rgb')
    expect(detectCssColorType('rgba(1, 2, 3, 0.2)').type).toBe('rgba')
  })

  it('detects lab', () => {
    const result = detectCssColorType('lab(50 10 -20)')
    expect(result.type).toBe('lab')
    expect(result.value).toMatchObject({ l: 50, a: 10, b: -20 })
  })

  it('returns unknown for unsupported values', () => {
    expect(detectCssColorType('tomato')).toEqual({ type: 'unknown', value: 'tomato' })
  })
})
