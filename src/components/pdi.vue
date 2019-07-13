<template>
  <div id="app">
    <md-toolbar class="md-dense">
      <h3 class="md-title page-title">
        PDI
      </h3>
    </md-toolbar>
    <div class="container">
      <mensagem ref="msg"/>

      <form>
          <md-steppers>
            <md-step id="first" md-label="Dados Gerais">
              <md-autocomplete v-model="pessoa_selecionada" :md-options="autocomplete_pessoa">
                <label>Pessoa *</label>
                <template slot="md-autocomplete-item" slot-scope="{ item }">
                  {{ item.nome }}
                </template>
                <template slot="md-autocomplete-empty"> 
                  <i> Nenhum resultado encontrado</i> 
                </template>
              </md-autocomplete>

              <md-field>
                <label>Observações</label>
                <md-input type="text" v-model="pdi.observacoes"/>
              </md-field>
            </md-step>

            <md-step id="second" md-label="Itens">
              <md-field>
                <label>Descrição do Item</label>
                <md-input type="text" v-model="item_adicionado.descricao" required/>
              </md-field>
              <div style="display:flex">
                <md-datepicker v-model="item_adicionado.data_prevista">
                  <label>Data Prevista *</label>
                </md-datepicker>
                <md-datepicker v-model="item_adicionado.data_realizacao" md-primary>
                  <label>Data de Realização</label>
                </md-datepicker>
              </div>
              <div class="right">
                <md-button class="md-icon-button md-raised md-primary" @click="adicionarItem()">
                  <i class="material-icons">add</i>
                  <md-tooltip md-direction="right">Adicionar Item</md-tooltip>
                </md-button>
              </div>

              <md-table v-model="pdi.itens">
                <md-table-toolbar>
                  <div class="md-toolbar-section-start">
                    <h1 class="md-title">Lista de Itens</h1>
                  </div>
                </md-table-toolbar>
                
                <md-table-empty-state>
                  <i>Nenhum resultado encontrado.</i>
                </md-table-empty-state>

                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="DESCRIÇÃO">{{item.descricao}}</md-table-cell>
                  <md-table-cell md-label="DATA PREVISTA">{{item.data_prevista}}</md-table-cell>
                  <md-table-cell md-label="DATA DE REALIZAÇÃO">{{item.data_realizacao}}</md-table-cell>
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

            </md-step>
          </md-steppers>
          
          <div class="right">
            <md-button class="md-raised md-primary" @click="salvar()">
                <i class="material-icons">save</i>&nbsp;
                <span>Salvar</span>
            </md-button>
          </div>
      </form>

      <md-table v-model="lista_pdi">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Lista de PDIs</h1>
          </div>
        </md-table-toolbar>
        
        <md-table-empty-state>
          <i>Nenhum resultado encontrado.</i>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="PESSOA">{{item.pessoa.nome}}</md-table-cell>
          <md-table-cell md-label="OBSERVAÇÕES">{{item.observacoes}}</md-table-cell>
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

import ConfiguracaoPdi from '@/services/pdi'
import AutocompleteHelper from '@/services/autocompleteHelper'

export default{
  data(){
    return {
      pdi:{
        observacao: '',
        pessoa: {
          id: 0
        },
        itens: []
      },
      lista_pdi: [],
      pessoa_selecionada: '',
      autocomplete_pessoa: [],
      item_adicionado:{
        id: 0,
        descricao: '',
        data_prevista: null,
        data_realizacao:null
      }
    }
  },
  mounted(){
    this.autocomplete_pessoa = AutocompleteHelper.carregarAutocompletePessoa()
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.pessoa_selecionada = ''
      this.pdi = {}
      this.item_adicionado = {} 
      this.$refs.msg.limpar()
    },
    listar(){
        ConfiguracaoPdi.listar()
        .then(resposta => {
          console.log(resposta.data)
          this.lista_pdi = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      this.pdi.pessoa.id = this.pessoa_selecionada.id
      ConfiguracaoPdi.salvar(this.pdi)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Configuração salva com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(pdi){
      this.pdi = pdi
      this.pessoa_selecionada = AutocompleteHelper.selecionarPessoa(pdi.pessoa)
    },
    remover(pdi){
      if(confirm('Deseja excluir o pdi?')){
        ConfiguracaoPdi.remover(pdi).then(resposta => {
          this.$refs.msg.addSucess('Configuração removida com sucesso!')
          this.listar()
         }).catch(erro => {
          this.$refs.msg.addErro(erro)
        }) 
      }
    },
    adicionarItem(){
      let index = this.pdi.itens.indexOf(this.item_adicionado)
      if(index >=0 ){
        this.pdi.itens.splice(index)
      }
      this.pdi.itens.push(this.item_adicionado)
      this.item_adicionado = {}
    },
    removerItem(index){
      if(confirm('Deseja excluir o item?')){
        this.pdi.itens.splice(index)
      }
    },
    editarItem(item){
      this.item_adicionado = item
    }
  }
}
</script>

<style>
.md-drawer {
    background: blue !important;
}
</style>
