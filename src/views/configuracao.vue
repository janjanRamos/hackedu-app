<template>
  <div id="app">
    <md-toolbar class="md-dense">
      <h3 class="md-title page-title">
        Configurar PDI
      </h3>
    </md-toolbar>
    <div class="container">
      <mensagem ref="msg"/>

      <form>
          <md-field>
            <label>Descrição</label>
            <md-input type="text" v-model="configuracao.descricao" required/>
          </md-field>

          <md-autocomplete v-model="setor_selecionado" :md-options="autocomplete_setor">
            <label>Setor *</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item.nome }}
            </template>
            <template slot="md-autocomplete-empty"> 
              <i> Nenhum resultado encontrado</i> 
            </template>
          </md-autocomplete>
          
          <md-field>
            <label>Periodicidade (em meses)</label>
            <md-input type="number" v-model="configuracao.periodicidadeEmMeses" required/>
          </md-field>

          <md-switch v-model="configuracao.ativo">{{ configuracao.ativo ? 'Ativo' : 'Inativo' }}</md-switch>

          <div class="right">
            <md-button class="md-raised md-primary" @click="salvar()">
                <i class="material-icons">save</i>&nbsp;
                <span>Salvar</span>
            </md-button>
          </div>
      </form>

      <md-table v-model="lista_configuracao">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Lista de Configurações</h1>
          </div>
        </md-table-toolbar>
        
        <md-table-empty-state>
          <i>Nenhum resultado encontrado.</i>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="DESCRIÇÃO">{{item.descricao}}</md-table-cell>
          <md-table-cell md-label="SETOR">{{item.setor.nome}}</md-table-cell>
          <md-table-cell md-label="PERIODICIDADE">{{item.periodicidadeEmMeses}} meses</md-table-cell>
          <md-table-cell md-label="ATIVO">{{item.ativo ? 'Sim' : 'Não'}}</md-table-cell>
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

import Configuracao from '@/services/configuracao'
import AutocompleteHelper from '@/services/autocompleteHelper'

export default{
  data(){
    return {
      configuracao:{
        descricao: '',
        setor: {
          id: 0
        },
        periodicidadeEmMeses: null,
        ativo: true
      },
      lista_configuracao: [],
      setor_selecionado: '',
      autocomplete_setor: []
    }
  },
  mounted(){
    this.autocomplete_setor = AutocompleteHelper.carregarAutocompleteSetor()
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.setor_selecionado = ''
      this.configuracao = {}
      this.$refs.msg.limpar()
    },
    listar(){
        Configuracao.listar()
        .then(resposta => {
          this.lista_configuracao = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      this.configuracao.setor.id = this.setor_selecionado.id
      Configuracao.salvar(this.configuracao)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Configuração salva com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(configuracao){
      this.configuracao = configuracao
      this.setor_selecionado = AutocompleteHelper.selecionarSetor(configuracao.setor)
    },
    remover(configuracao){
      if(confirm('Deseja excluir o configuracao?')){
        Configuracao.remover(configuracao).then(resposta => {
          this.$refs.msg.addSucess('Configuração removida com sucesso!')
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
</style>
