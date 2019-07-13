<template>
  <div >
    <md-toolbar class="md-dense">
      <h3 class="md-title page-title">
        Setor
      </h3>
    </md-toolbar>
    <div class="container">
      <mensagem ref="msg"/>

      <form>
          <md-field>
            <label>Nome</label>
            <md-input type="text" v-model="setor.nome" required/>
          </md-field>

          <div class="right">
            <md-button class="md-raised md-primary" @click="salvar()">
                <i class="material-icons">save</i>&nbsp;
                <span>Salvar</span>
            </md-button>
          </div>
      </form>

      <md-table v-model="lista_setores">
        <md-table-toolbar>
          <div class="md-toolbar-section-start">
            <h1 class="md-title">Lista de Setores</h1>
          </div>
        </md-table-toolbar>
        
        <md-table-empty-state>
          <i>Nenhum resultado encontrado.</i>
        </md-table-empty-state>

        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="NOME">{{item.nome}}</md-table-cell>
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

import Setor from '@/services/setor'

export default{
  data(){
    return {
      setor:{
        nome: ''
      },
      lista_setores: []
    }
  },
  mounted(){
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.setor = {}
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
    }
  }
}
</script>

<style>
</style>
