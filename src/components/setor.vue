<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper white darken-1">
        <span class="brand-logo center">Setor</span>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="msg"/>

      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="setor.nome">
          
          <md-autocomplete v-model="gestor_selecionado" :md-options="autocomplete_gestor" >
            <label>Gestor</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item.nome }}
            </template>
            <template slot="md-autocomplete-empty"> 
              <i> Nenhum resultado encontrado</i> 
            </template>
          </md-autocomplete>

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
            <th>GESTOR</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="setor of lista_setores" :key="setor.id">
            <td>
              {{setor.nome}}
            </td>
            <td>
              <span v-if="setor.gestor">{{setor.gestor.nome}}</span>
              <span v-else> -- </span>
            </td>
            <td style="text-align: right">
              <button @click="editar(setor)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              &nbsp;
              <button @click="remover(setor)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
          <tr v-if="!lista_setores.length">
            <td colspan="3">
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
      setor:{
        nome: '',
        gestor: {
          id: 0
        }
      },
      lista_setores: [],
      gestor_selecionado: '',
      autocomplete_gestor: []
    }
  },
  mounted(){
    this.carregarAutocompleteGestor()
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.setor = {}
      this.gestor_selecionado = ''
      this.$refs.msg.limpar()
    },
    listar(){
        Setor.listar()
        .then(resposta => {
          this.lista_setores = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      this.setor.gestor.id = this.gestor_selecionado.id
      Setor.salvar(this.setor)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Setor salvo com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(setor){
      this.setor = setor
      if(setor.gestor){
        this.gestor_selecionado = {
          'id': setor.gestor.id,
          'nome': setor.gestor.nome,
          'toLowerCase': () => setor.gestor.nome.toLowerCase(),
          'toString': () => setor.gestor.nome
        }
      }else{
        this.gestor_selecionado = ''
      }
    },
    remover(setor){
      if(confirm('Deseja excluir o setor?')){
        Setor.remover(setor).then(resposta => {
          this.$refs.msg.addSucess('Setor removido com sucesso!')
          this.listar()
         }).catch(erro => {
          this.$refs.msg.addErro(erro)
        }) 
      }
    },
    carregarAutocompleteGestor(){
      Pessoa.listar()
      .then(resposta => {
        this.autocomplete_gestor 
          = resposta.data.map(pessoa => ({
            'id': pessoa.id,
            'nome': pessoa.nome,
            'toLowerCase': () => pessoa.nome.toLowerCase(),
            'toString': () => pessoa.nome
          }))
      }).catch(erro => {
        this.$refs.msg.addErro("Erro ao carregar a lista de gestores.")
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
