<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper white darken-1">
        <span class="brand-logo center">Cargo</span>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="msg"/>

      <form @submit.prevent="salvar">
          <md-field>
            <label>Nome</label>
            <md-input type="text" v-model="cargo.nome" required/>
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
          <tr v-for="cargo of lista_cargos" :key="cargo.id">
            <td>
              {{cargo.nome}}
            </td>
            <td style="text-align: right">
              <button @click="editar(cargo)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              &nbsp;
              <button @click="remover(cargo)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
          <tr v-if="!lista_cargos.length">
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

import Cargo from '@/services/cargo'

export default{
  data(){
    return {
      cargo:{
        nome: '',
      },
      lista_cargos: []
    }
  },
  mounted(){
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.cargo = {}
      this.$refs.msg.limpar()
    },
    listar(){
        Cargo.listar()
        .then(resposta => {
          this.lista_cargos = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      Cargo.salvar(this.cargo)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Cargo salvo com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(cargo){
      this.cargo = cargo
    },
    remover(cargo){
      if(confirm('Deseja excluir o cargo?')){
        Cargo.remover(cargo).then(resposta => {
          this.$refs.msg.addSucess('Cargo removido com sucesso!')
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
