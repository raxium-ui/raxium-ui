export function parseCubicBezier(bezierString: string): [number, number, number, number] {
  const matches = bezierString.match(/cubic-bezier\(([^)]+)\)/)
  if (!matches || !matches[1]) {
    console.warn('Invalid cubic-bezier values. Use default values.')
    return [0, 0, 0, 0]
  }
  const values = matches[1].split(/\s*,\s*/).map(Number)
  if (values.length !== 4 || values.some(isNaN)) {
    console.warn('Invalid cubic-bezier values. Expected four numbers.')
    return [0, 0, 0, 0]
  }
  return values as [number, number, number, number]
}
