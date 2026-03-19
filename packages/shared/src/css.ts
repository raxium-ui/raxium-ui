export function px2rem(px: number | string) {
  if (typeof px === 'string') {
    if (px.endsWith('rem'))
      return parseFloat(px)
    else px = parseFloat(px)
  }
  if (!px)
    px = 0
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px')
  return px / base
}

export function rem2px(rem: number | string) {
  const base = parseFloat(window.getComputedStyle(document.documentElement).fontSize || '16px')
  if (typeof rem === 'string') {
    if (rem.endsWith('px')) {
      return parseFloat(rem)
    }
    else {
      rem = parseFloat(rem) * base
    }
  }
  if (!rem)
    rem = 0
  return rem * base
}

export function spaceTimes(times: number) {
  const spacing = parseFloat(getCssVar('--spacing') ?? '.25rem')
  return times * rem2px(spacing)
}

export function alignPx(px: number, dpr = window.devicePixelRatio, round = true) {
  return round ? Math.round(Math.round(px * dpr) / dpr) : Math.round(px * dpr) / dpr
}

const CSS_DYNAMIC_VALUE_REG = /(?:^|[^\w-])(?:calc|var)\(|\b\d*\.?\d+(?:rem|em|%)\b/i
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
): string | undefined
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback: string,
): string
export function getNodeCssVar(
  node: HTMLElement | null | undefined,
  varName: string,
  fallback?: string,
): string | undefined {
  if (!window)
    return fallback !== undefined ? fallback : undefined
  node = node ?? document.documentElement
  const value = getComputedStyle(node).getPropertyValue(varName).trim()
  if (value) {
    if (CSS_DYNAMIC_VALUE_REG.test(value)) {
      const el = document.createElement('div')
      el.style.position = 'absolute'
      el.style.visibility = 'hidden'
      el.style.width = value
      document.body.appendChild(el)
      const px = getComputedStyle(el).width.trim()
      document.body.removeChild(el)
      return px && px !== 'auto' ? `${alignPx(parseFloat(px))}` : value
    }
    return value
  }

  return fallback !== undefined ? fallback : undefined
}

export function getCssVar(variableName: string, fallback?: string) {
  return getNodeCssVar(null, variableName, fallback ?? '')
}

export function getCssColor(colorName: string, fallback?: string) {
  return getCssVar(`--color-${colorName}`, fallback)
}
