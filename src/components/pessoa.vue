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
          <md-field>
            <label>Nome</label>
            <md-input type="text" v-model="pessoa.nome" required/>
          </md-field>
          
          <md-autocomplete v-model="setor_selecionado" :md-options="autocomplete_setor" >
            <label>Setor *</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item.nome }}
            </template>
            <template slot="md-autocomplete-empty"> 
              <i> Nenhum resultado encontrado</i> 
            </template>
          </md-autocomplete>

          <md-autocomplete v-model="cargo_selecionado" :md-options="autocomplete_cargo" >
            <label>Cargo *</label>
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
            <th>SETOR</th>
            <th>CARGO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa of lista_pessoas" :key="pessoa.id">
            <td>{{pessoa.nome}}</td>
            <td>{{pessoa.setor.nome}}</td>
            <td>{{pessoa.cargo.nome}}</td>
            
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
import Pessoa from '@/services/pessoa'
import AutocompleteHelper from '@/services/autocompleteHelper'

export default{
  data(){
    return {
      pessoa:{
        nome: '',
        setor: {
          id: 0
        },
        cargo: {
          id: 0
        }
      },
      lista_pessoas: [],
      setor_selecionado: '',
      autocomplete_setor: [],
      cargo_selecionado: '',
      autocomplete_cargo: []
    }
  },
  mounted(){
    this.autocomplete_setor = AutocompleteHelper.carregarAutocompleteSetor()
    this.autocomplete_cargo = AutocompleteHelper.carregarAutocompleteCargo()
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.pessoa = {}
      this.setor_selecionado = ''
      this.cargo_selecionado = ''
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
      this.pessoa.cargo.id = this.cargo_selecionado.id
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
      this.setor_selecionado = AutocompleteHelper.selecionarSetor(pessoa.setor)
      this.cargo_selecionado = AutocompleteHelper.selecionarCargo(pessoa.cargo)
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
    }
  }
}
</script>

<style>
md-autocomplete {
  z-index: 10000;
}
</style>
