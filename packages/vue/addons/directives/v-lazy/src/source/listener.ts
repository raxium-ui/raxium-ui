import type { VueLazyloadOptions } from './types/lazyload'
import type {
  ImageCache,
} from './util'
import { isArray } from 'es-toolkit/compat'
import { isMissingLazySrc } from '../utils'
import {
  loadImageAsync,
  noop,
} from './util'

// el: {
//     state,
//     src,
//     error,
//     loading
// }

export default class ReactiveListener {
  el: HTMLElement | null
  src: string | string[]
  error: string | null
  loading: string
  bindType: string | null
  $parent: Element | null
  options: VueLazyloadOptions
  cors: string
  elRenderer: Function
  attempt: number
  naturalHeight: number
  naturalWidth: number
  performanceData: {
    init: number
    loadStart: number
    loadEnd: number
  }

  state!: {
    loading: boolean
    error: boolean
    loaded: boolean
    rendered: boolean
  }

  rect: DOMRect
  _imageCache: ImageCache
  constructor(
    el: HTMLElement,
    src: string | string[],
    error: string,
    loading: string,
    bindType: string,
    $parent: Element,
    options: VueLazyloadOptions,
    cors: string,
    elRenderer: Function,
    imageCache: ImageCache,
  ) {
    this.el = el
    this.src = src
    this.error = error
    this.loading = loading
    this.bindType = bindType
    this.attempt = 0
    this.cors = cors

    this.naturalHeight = 0
    this.naturalWidth = 0

    this.options = options

    this.rect = {} as DOMRect

    this.$parent = $parent
    this.elRenderer = elRenderer
    this._imageCache = imageCache
    this.performanceData = {
      init: Date.now(),
      loadStart: 0,
      loadEnd: 0,
    }

    this.filter()
    this.initState()
    if (isMissingLazySrc(this.src as string | string[])) {
      this.state.error = true
      this.state.loaded = false
      this.render('error', false)
    }
    else {
      this.render('loading', false)
    }
  }

  /*
   * init listener state
   * @return
   */
  initState() {
    const serialized = isArray(this.src) ? (this.src as string[]).join(',') : String(this.src)
    if ('dataset' in this.el!) {
      this.el.dataset.src = serialized
    }
    else {
      this.el!.setAttribute('data-src', serialized)
    }

    this.state = {
      loading: false,
      error: false,
      loaded: false,
      rendered: false,
    }
  }

  /*
   * record performance
   * @return
   */
  record(event: 'init' | 'loadStart' | 'loadEnd') {
    this.performanceData[event] = Date.now()
  }

  /*
   * update image listener data
   * @param  {String} image uri
   * @param  {String} loading image uri
   * @param  {String} error image uri
   * @return
   */
  update(option: { src: string | string[], loading: string, error: string }) {
    const oldSrc = this.src
    this.src = option.src
    this.loading = option.loading
    this.error = option.error
    this.filter()
    if (oldSrc !== this.src) {
      this.attempt = 0
      this.initState()
      if (isMissingLazySrc(option.src)) {
        this.state.error = true
        this.state.loaded = false
        this.render('error', false)
      }
    }
  }

  /*
   * get el node rect
   * @return
   */
  getRect() {
    this.rect = this.el!.getBoundingClientRect()
  }

  /*
   * check el is in view
   * @return {Boolean} el is in view
   */
  checkInView() {
    this.getRect()
    return this.rect.top < window.innerHeight * this.options.preLoad!
      && this.rect.bottom > this.options.preLoadTop!
      && this.rect.left < window.innerWidth * this.options.preLoad!
      && this.rect.right > 0
  }

  /*
   * listener filter
   */
  filter() {
    for (const key in this.options.filter) {
      this.options.filter[key](this, this.options)
    }
  }

  /*
   * render loading first
   * @params cb:Function
   * @return
   */
  renderLoading(cb: Function) {
    this.state.loading = true
    loadImageAsync({
      src: this.loading,
      cors: this.cors,
    }, () => {
      this.render('loading', false)
      this.state.loading = false
      cb()
    }, () => {
      // handler `loading image` load failed
      cb()
      this.state.loading = false
      if (!this.options.silent)
        console.warn(`VueLazyload log: load failed with loading image(${this.loading})`)
    })
  }

  /*
   * try load image and  render it
   * @return
   */
  load(onFinish = noop) {
    if ((this.attempt > this.options.attempt! - 1) && this.state.error) {
      if (!this.options.silent)
        console.log(`VueLazyload log: ${this.src} tried too more than ${this.options.attempt} times`)
      onFinish()
      return
    }
    if (this.state.rendered && this.state.loaded)
      return
    if (isMissingLazySrc(this.src) && this.state.error) {
      onFinish()
      return
    }
    if (this._imageCache.has(this.src as string)) {
      this.state.loaded = true
      this.render('loaded', true)
      this.state.rendered = true
      return onFinish()
    }

    if (isMissingLazySrc(this.src)) {
      if (!this.state.error) {
        !this.options.silent && console.error(new Error('image src is required'))
        this.state.error = true
        this.state.loaded = false
        this.render('error', false)
      }
      onFinish()
      return
    }

    this.renderLoading(() => {
      this.attempt++

      this.options.adapter.beforeLoad && this.options.adapter.beforeLoad(this, this.options)
      this.record('loadStart')

      loadImageAsync({
        src: this.src as string,
        cors: this.cors,
      }, (
        data: {
          naturalHeight: number
          naturalWidth: number
          src: string
        },
      ) => {
        this.naturalHeight = data.naturalHeight
        this.naturalWidth = data.naturalWidth
        this.state.loaded = true
        this.state.error = false
        this.record('loadEnd')
        this.render('loaded', false)
        this.state.rendered = true
        this._imageCache.add(this.src as string)
        onFinish()
      }, (err: Error) => {
        !this.options.silent && console.error(err)
        this.state.error = true
        this.state.loaded = false
        this.render('error', false)
      })
    })
  }

  /*
   * render image
   * @param  {String} state to render // ['loading', 'src', 'error']
   * @param  {String} is form cache
   * @return
   */
  render(state: string, cache: boolean) {
    this.elRenderer(this, state, cache)
  }

  /*
   * output performance data
   * @return {Object} performance data
   */
  performance() {
    let state = 'loading'
    let time = 0

    if (this.state.loaded) {
      state = 'loaded'
      time = (this.performanceData.loadEnd - this.performanceData.loadStart) / 1000
    }

    if (this.state.error)
      state = 'error'

    return {
      src: this.src,
      state,
      time,
    }
  }

  /*
   * $destroy
   * @return
   */
  $destroy() {
    this.el = null
    this.src = ''
    this.error = null
    this.loading = ''
    this.bindType = null
    this.attempt = 0
  }
}
