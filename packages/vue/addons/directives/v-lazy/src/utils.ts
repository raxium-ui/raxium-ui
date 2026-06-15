import { isArray, isEmpty } from 'es-toolkit/compat'

/** 无有效图片地址（空串、仅空白、空数组或数组内全部无效） */
export function isMissingLazySrc(src: string | string[]): boolean {
  if (isArray(src)) {
    if (src.length === 0)
      return true
    return src.every(item => item == null || String(item).trim() === '')
  }
  return src == null || String(src).trim() === ''
}

/** 应整段赋给 background / background-image 的渐变（避免误把含 "gradient" 的 URL 当渐变） */
export function isCssGradientBackgroundValue(value: string): boolean {
  const s = value.trim().toLowerCase()
  return /^(?:(?:-webkit-)?(?:linear|radial)-gradient|(?:conic|repeating-linear|repeating-radial|repeating-conic)-gradient)\(/i.test(s)
}

/** 是否应通过 new Image() 预加载的 placeholder（排除 CSS gradient、空值等） */
export function isLazyPreloadableImageSrc(value: string): boolean {
  const s = String(value ?? '').trim()
  if (!s)
    return false
  if (isCssGradientBackgroundValue(s))
    return false
  // data / blob 可直接作为 Image.src
  if (/^(?:data:image\/|blob:)/i.test(s))
    return true
  // 与 Cortex10 对齐：仅常见图片扩展名才预加载
  return /\.(?:png|jpe?g|gif|webp|svg|avif)(?:\?|#|$)/i.test(s)
}

export function loadImageArrAsync(
  arr: string[],
  index: number,
  resolve: Function,
  reject: Function,
) {
  const image = new Image()
  if (isEmpty(arr)) {
    const err = new Error('image src is required')
    return reject(0, err)
  }
  if (isEmpty(arr[index])) {
    return reject(index + 1, new Error('will load next'))
  }
  image.src = arr[index]
  image.onload = function () {
    resolve({
      naturalHeight: image.naturalHeight,
      naturalWidth: image.naturalWidth,
      src: arr[index],
    })
  }
  image.onerror = function (e) {
    reject(index + 1, e)
  }
}
