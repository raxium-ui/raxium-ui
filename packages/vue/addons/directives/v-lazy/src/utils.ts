import { isEmpty } from 'es-toolkit/compat'

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
