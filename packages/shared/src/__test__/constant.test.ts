import { describe, expect, it } from 'vitest'
import { THEME_SIZE } from '../constant'

describe('THEME_SIZE', () => {
  it('lists size tokens from smallest to largest', () => {
    expect(THEME_SIZE).toEqual(['xs', 'sm', 'base', 'lg'])
  })
})
