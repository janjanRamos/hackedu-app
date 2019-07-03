<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper white darken-1">
        <span class="brand-logo center">Pessoa</span>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="msg"/>

      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="pessoa.nome">
          <md-autocomplete v-model="setor_selecionado" :md-options="autocomplete_setor" >
            <label>Setor</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item.nome }}
            </template>
            <template slot="md-autocomplete-empty"> 
              <i> Nenhum resultado encontrado</i> 
            </template>
          </md-autocomplete>
          <label>Cargo</label>
          <input type="text" placeholder="Cargo" v-model="pessoa.cargo">
          
          <div style="text-align: right">
            <button class="waves-effect waves-light btn-small" >
                Salvar
                <i class="material-icons left">save</i>
            </button>
          </div>
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
            <td>{{pessoa.setor.nome}}</td>
            <td>{{pessoa.cargo}}</td>
            
            <td style="text-align: right">
              <button @click="editar(pessoa)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              &nbsp;
              <button @click="remover(pessoa)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
          <tr v-if="!lista_pessoas.length">
            <td colspan="4">
              <i>Nenhum resultado encontrado.</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import Setor from '@/services/setor'
import Pessoa from '@/services/pessoa'

export default{
  data(){
    return {
      pessoa:{
        nome: '',
        setor: {
          id: 0
        },
        cargo: ''
      },
      lista_pessoas: [],
      setor_selecionado: '',
      autocomplete_setor: []
    }
  },
  mounted(){
    this.carregarAutocompleteSetor()
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.pessoa = {}
      this.setor_selecionado = ''
      this.$refs.msg.limpar()
    },
    listar(){
        Pessoa.listar()
        .then(resposta => {
          this.lista_pessoas = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      this.pessoa.setor.id = this.setor_selecionado.id
      Pessoa.salvar(this.pessoa)
        .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Pessoa salva com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })         
    },
    editar(pessoa){
      this.pessoa = pessoa
      if(pessoa.setor){
        this.setor_selecionado = {
          'id': pessoa.setor.id,
          'nome': pessoa.setor.nome,
          'toLowerCase': () => pessoa.setor.nome.toLowerCase(),
          'toString': () => pessoa.setor.nome
        }
      }else{
        this.setor_selecionado = ''
      }
    },
    remover(pessoa){
      if(confirm('Deseja excluir a pessoa?')){
        Pessoa.remover(pessoa).then(resposta => {
          this.$refs.msg.addSucess('Pessoa removida com sucesso!')
          this.listar()
         }).catch(erro => {
          this.$refs.msg.addErro(erro)
        }) 
      }
    },
    carregarAutocompleteSetor(){
      Setor.listar()
      .then(resposta => {
        this.autocomplete_setor
          = resposta.data.map(setor => ({
            'id': setor.id,
            'nome': setor.nome,
            'toLowerCase': () => setor.nome.toLowerCase(),
            'toString': () => setor.nome
          }))
      }).catch(erro => {
        this.$refs.msg.addErro("Erro ao carregar a lista de setores.")
      })
    }
  }
}
</script>

<style>
.md-menu-content {
  z-index: 10;
}
</style>
