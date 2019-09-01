import Vue from 'vue'
import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueRouter from 'vue-router'
import router from '@/router.js'
Vue.use(VueRouter)
Vue.use(BootstrapVue)

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
Vue.use(Vuesax)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

import mensagem from '@/components/mensagem.vue'
Vue.component('mensagem', mensagem, {lista_mensagens: []})

import inputcpf from '@/components/inputcpf.vue'
Vue.component('inputcpf', inputcpf)

import moment from 'moment'
Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})
Vue.material.locale.dateFormat = 'dd/MM/yyyy'

import InputMask from 'vue-input-mask';
Vue.component('input-mask', InputMask)

Vue.config.productionTip = false

import Vuex from 'vuex'
Vue.use(Vuex)
import store from '@/store.js'

new Vue({
  store,
  router: router, 
  render: h => h(App)
}).$mount('#app')
