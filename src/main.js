import Vue from 'vue'
import App from '@/App.vue'

import VueRouter from 'vue-router'
import router from '@/router/index.js'
Vue.use(VueRouter)

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

Vue.config.productionTip = false
new Vue({
  router: router, 
  render: h => h(App)
}).$mount('#app')
