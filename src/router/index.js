import VueRouter from 'vue-router'
import Setor from '@/components/setor.vue'
import Pessoa from '@/components/pessoa.vue'
import Home from '@/components/home.vue'
import Cargo from '@/components/cargo.vue'
import Tag from '@/components/tag.vue'
// import Pdi from '@/components/pdi.vue'
import ConfiguracaoPdi from '@/components/configuracaoPdi.vue';

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
    },
    {
      path: '/tag',
      component: Tag
    },
    {
      path: '/configuracaopdi',
      component: ConfiguracaoPdi
    }
    // ,
    // {
    //   path: '/pdi',
    //   component: Pdi
    // }
  ]
})