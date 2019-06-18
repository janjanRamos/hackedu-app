<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Pessoa</a>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="root"/>

      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="pessoa.nome">
          <label>Setor</label>
          <input type="text" placeholder="Setor" v-model="pessoa.setor">
          <label>Cargo</label>
          <input type="text" placeholder="Cargo" v-model="pessoa.cargo">
          <button class="waves-effect waves-light btn-small" >
              Salvar
              <i class="material-icons left">save</i>
          </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>SETOR</th>
            <th>CARGO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa of lista_pessoas" :key="pessoa.id">
            <td>{{pessoa.nome}}</td>
            <td>{{pessoa.setor}}</td>
            <td>{{pessoa.cargo}}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import Pessoa from './services/pessoa'
import mensagem from './components/mensagem.vue'

export default{
  components:{
    'mensagem': mensagem
  },
  data(){
    return {
      pessoa:{
        nome: '',
        setor: '',
        cargo: ''
      },
      lista_pessoas: []
    }
  },
  mounted(){
    this.$refs.root.limpar()
    this.listar()
  },

  methods:{
    /* eslint-disable no-console */
    listar(){
        Pessoa.listar()
        .then(resposta => {
          this.lista_pessoas = resposta.data
        }).catch(erro => {
          this.$refs.root.addErro(erro.message)
        })
    },
    salvar(){
      Pessoa.salvar(this.pessoa)
      .then(resposta => {
        this.$refs.root.addSucess('Pessoa salva com sucesso!')
      }).catch(erro => {
        this.$refs.root.addErro(erro.message)
      })
    }
  }
}
</script>

<style>

</style>
