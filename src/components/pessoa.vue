<template>
  <div id="app">
     <md-toolbar class="md-dense">
      <h3 class="md-title page-title">
        Pessoa
      </h3>
    </md-toolbar>
    <div class="container">
      <mensagem ref="msg"/>

      <form>
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

          <div class="right">
            <md-button class="md-raised md-primary" @click="salvar()">
                <i class="material-icons">save</i>&nbsp;
                <span>Salvar</span>
            </md-button>
          </div>
      </form>

      <md-table v-model="lista_pessoas">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Lista de Pessoas</h1>
          </div>
        </md-table-toolbar>
        
        <md-table-empty-state>
          <i>Nenhum resultado encontrado.</i>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="NOME">{{item.nome}}</md-table-cell>
          <md-table-cell md-label="SETOR">{{item.setor.nome}}</md-table-cell>
          <md-table-cell md-label="CARGO">{{item.cargo.nome}}</md-table-cell>
          <md-table-cell class="right">
            <md-button class="md-icon-button md-raised md-primary " @click="editar(item)">
              <i class="material-icons">create</i>
              <md-tooltip md-direction="right">Editar</md-tooltip>
            </md-button>
            &nbsp;
            <md-button class="md-icon-button md-raised md-accent" @click="remover(item)">
              <i class="material-icons">delete</i>
              <md-tooltip md-direction="right">Remover</md-tooltip>
            </md-button>
          </md-table-cell>
        </md-table-row>
      </md-table>

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
