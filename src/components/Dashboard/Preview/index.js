import VuePagePreview from './App.vue'

// import slider from '../Designer/common/slider.vue'
// import icon from '../Designer/common/icon.vue'

import '../Designer/app.scss'

const install = function (Vue, opts = {}) {
//  Vue.component('VpdSlider', slider)
//  Vue.component('VpdIcon', icon)

  Vue.component('VuePagePreview', VuePagePreview)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  VuePagePreview
}
