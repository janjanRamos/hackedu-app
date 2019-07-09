<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper white darken-1">
        <span class="brand-logo center">Tag</span>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="msg"/>

      <form @submit.prevent="salvar">
          <md-field>
            <label>Nome</label>
            <md-input type="text" v-model="tag.nome" required/>
          </md-field>

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tag of lista_tags" :key="tag.id">
            <td>
              {{tag.nome}}
            </td>
            <td style="text-align: right">
              <button @click="editar(tag)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              &nbsp;
              <button @click="remover(tag)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
          <tr v-if="!lista_tags.length">
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

import Tag from '@/services/tag'

export default{
  data(){
    return {
      tag:{
        nome: '',
      },
      lista_tags: []
    }
  },
  mounted(){
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.tag = {}
      this.$refs.msg.limpar()
    },
    listar(){
        Tag.listar()
        .then(resposta => {
          this.lista_tags = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      Tag.salvar(this.tag)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Tag salva com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(tag){
      this.tag = tag
    },
    remover(tag){
      if(confirm('Deseja excluir o tag?')){
        Tag.remover(tag).then(resposta => {
          this.$refs.msg.addSucess('Tag removida com sucesso!')
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
