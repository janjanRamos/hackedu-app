import Vuex from 'vuex'
import Vue from 'vue'
import router from '@/router.js'
Vue.use(Vuex)

const store = new Vuex.Store({    
    state: {
      autenticado: false,
      usuarioLogado: null
    },
    mutations: {    
      setAutenticado (state, usuarioLogado) {
        state.autenticado = usuarioLogado != null;
        state.usuarioLogado = usuarioLogado;
      },
      logout(state) {
        state.autenticado = false;
        state.usuarioLogado = null;
      }
    },
    actions: {
      logout({commit}) {
        commit('logout');
        router.push('login');
      }
    }
})

export default store;