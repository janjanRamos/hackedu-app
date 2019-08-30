import VueRouter from 'vue-router'
import Home from '@/components/home.vue'
import Setor from '@/components/setor.vue'
import Pessoa from '@/components/pessoa.vue'
import Cargo from '@/components/cargo.vue'
import Tag from '@/components/tag.vue'
import Pdi from '@/components/pdi.vue'
import Configuracao from '@/components/configuracao.vue'
import Login from '@/components/public/login.vue'
import Autocadastro from '@/components/public/autocadastro.vue'
import Senha from '@/components/public/senha.vue'
import store from '@/store/index.js'

const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/login',
      component: Login,
      meta: {public:true}
    },
    {
      path: '/',
      redirect: '/login',
      component: Login,
      meta: {public:true}
    },
    {
      path: '/home',
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
      path: '/configuracao',
      component: Configuracao
    },
    {
      path: '/pdi',
      component: Pdi
    },
    {
      path: '/login',
      component: Login,
      meta: {public:true}
    },
    {
      path: '/autocadastro',
      component: Autocadastro,
      meta: {public:true}
    },
    {
      path: '/senha',
      component: Senha,
      meta: {public:true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  //desloga se for redirecionar para uma página pública
  if (to.meta.public) {
    store.commit('logout');
    return next();
  }
  
  //libera se o usuário estiver autenticado
  if (store.state.autenticado) {
    return next();
  }

  //senão retorna para a página de login
  return next('/login');
})

export default router;