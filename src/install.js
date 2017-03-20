import { warn } from './util'
import mixin from './mixin'

export let Vue

export function install (_Vue) {
  Vue = _Vue

  const version = (Vue.version && Number(Vue.version.split('.')[0])) || -1
  if (process.env.NODE_ENV !== 'production' && install.installed) {
    warn('already installed.')
    return
  }
  install.installed = true

  if (process.env.NODE_ENV !== 'production' && version < 2) {
    warn(`vue-i18n (${install.version}) need to use Vue 2.0 or later (Vue: ${Vue.version}).`)
    return
  }

  Object.defineProperty(Vue.prototype, '$i18n', {
    get () { return this._i18n }
  })

  Vue.mixin(mixin)

  // use object-based merge strategy
  const strats = Vue.config.optionMergeStrategies
  strats.i18n = strats.methods
}