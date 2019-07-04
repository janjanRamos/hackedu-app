import VueRouter from 'vue-router'
import Setor from '@/components/setor.vue'
import Pessoa from '@/components/pessoa.vue'
import Home from '@/components/home.vue'
import Cargo from '@/components/cargo.vue'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/setor',
      component: Setor
    },
    {
      path: '/pessoa',
      component: Pessoa
    },
    {
      path: '/cargo',
      component: Cargo
    }
  ]
})