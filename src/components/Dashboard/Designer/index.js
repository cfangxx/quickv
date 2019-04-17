import VuePageDesigner from './index.vue'

import slider from './common/slider.vue'
import icon from './common/icon.vue'

import './app.scss'

const install = function (Vue, opts = {}) {
  Vue.component('VpdSlider', slider)
  Vue.component('VpdIcon', icon)

  Vue.component('VuePageDesigner', VuePageDesigner)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  VuePageDesigner
}
