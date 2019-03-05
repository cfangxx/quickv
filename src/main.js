import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import store from '@/store'
import router from '@/router'
import '@/scripts/permission' // permission control

import '@/scripts/icon' // icon

import '@/components/Dashboard/Widgets/libs' // chart libs

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
