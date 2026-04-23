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

export function loadImageArrAsync(
  arr: string[],
  index: number,
  resolve: Function,
  reject: Function,
) {
  const image = new Image()
  if (isEmpty(arr)) {
    const err = new Error('image src is required')
    return reject(err)
  }
  if (isEmpty(arr[index])) {
    return reject(index + 1, new Error('will load next'))
  }
  console.log('loadImageArrAsync', arr[index], index)
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
