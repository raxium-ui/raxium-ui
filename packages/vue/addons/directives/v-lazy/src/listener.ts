import type { ImageCache } from './source/util'
import type { VueLazyloadOptionsEx } from './types'
import { isArray, isEmpty } from 'es-toolkit/compat'
import ReactiveListener from './source/listener'
import { loadImageAsync } from './source/util'
import { loadImageArrAsync } from './utils'

class ReactiveListenerEx extends ReactiveListener {
  renderIndex: number = 0
  constructor(
    el: HTMLElement,
    src: string | string[],
    error: string,
    loading: string,
    bindType: string,
    $parent: Element,
    options: VueLazyloadOptionsEx,
    cors: string,
    elRenderer: Function,
    imageCache: ImageCache,
  ) {
    super(
      el,
      src as string,
      error,
      loading,
      bindType,
      $parent,
      options,
      cors,
      elRenderer,
      imageCache,
    )
  }

  initState() {
    super.initState()
    this.renderIndex = 0
  }

  load(onFinish = () => {}) {
    if (this.attempt > this.options.attempt! - 1 && this.state.error) {
      if (!this.options.silent) {
        console.log(
          `VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`,
        )
      }
      onFinish()
      return
    }
    if (this.state.rendered && this.state.loaded)
      return
    if (isArray(this.src)) {
      if ((this.options as VueLazyloadOptionsEx).useCache) {
        // 是否开启了数组src的缓存功能
        let hasCache = false
        for (let index = 0; index < this.src.length; index++) {
          if (this._imageCache.has(this.src[index])) {
            // 如果渲染序号有缓存 就直接取出缓存
            this.renderIndex = index // 当前渲染序号(注意要在 render方法前)
            this.state.loaded = true
            this.render('loaded', true)
            this.state.rendered = true
            hasCache = true
            break
          }
        }
        if (hasCache)
          return onFinish()
      }
    }
    else {
      if ((this.options as VueLazyloadOptionsEx).useCache && this._imageCache.has(this.src)) {
        this.state.loaded = true
        this.render('loaded', true)
        this.state.rendered = true
        return onFinish()
      }
    }

    this.renderLoading(() => {
      this.attempt++

      this.options.adapter.beforeLoad && this.options.adapter.beforeLoad(this, this.options)
      this.record('loadStart')

      if (isArray(this.src)) {
        const _onResolve = (data: { naturalHeight: number, naturalWidth: number, src: string }) => {
          this.naturalHeight = data.naturalHeight
          this.naturalWidth = data.naturalWidth
          this.state.loaded = true
          this.state.error = false
          this._imageCache.add(data.src)
          this.renderIndex = !isEmpty(this.src) ? this.src.indexOf(data.src) : 0
          this.render('loaded', false)
          this.record('loadEnd')
          this.state.rendered = true
          return onFinish()
        }
        const _onReject = (curIndex: number, err: Error) => {
          if (!isEmpty(this.src) && curIndex < this.src.length) {
            loadImageArrAsync(this.src as unknown as string[], curIndex, _onResolve, _onReject)
          }
          else {
            !this.options.silent && console.error(err)
            this.state.error = true
            this.state.loaded = false
            this.render('error', false)
          }
        }
        loadImageArrAsync(this.src, 0, _onResolve, _onReject)
      }
      else {
        loadImageAsync(
          {
            src: this.src,
            cors: this.cors,
          },
          (data: { naturalHeight: number, naturalWidth: number, src: string }) => {
            this.naturalHeight = data.naturalHeight
            this.naturalWidth = data.naturalWidth
            this.state.loaded = true
            this.state.error = false
            this.record('loadEnd')
            this.render('loaded', false)
            this.state.rendered = true
            this._imageCache.add(this.src)
            onFinish()
          },
          (err: Error) => {
            !this.options.silent && console.error(err)
            this.state.error = true
            this.state.loaded = false
            this.render('error', false)
          },
        )
      }
    })
  }
}

export default ReactiveListenerEx
