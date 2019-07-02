<template>
  <ul>
    <li v-for="(msg, index) of lista_mensagens" :key="index">
      <span v-bind:class="msg.tipo">{{msg.texto}}</span>
    </li>
  </ul>
</template>

<script>
export const ERRO = 'erro', INFO = 'info', WARN = 'warn', SUCESS = 'sucess'
export default {
  name: "mensagem",
  data() {
    return {
      lista_mensagens: []
    }
  },
  methods:{
    /* eslint-disable */
    addErro(erro) {
      if(erro.response 
          && erro.response.data 
          && erro.response.data.message
          && erro.response.status == 400){
        this.lista_mensagens = [{tipo: ERRO, texto: erro.response.data.message}]
      }else if(erro.message){
        this.lista_mensagens = [{tipo: ERRO, texto: erro.message}]
      }else{
        this.lista_mensagens = [{tipo: ERRO, texto: erro}]
      }
    },
    addInfo(msg) {
      this.lista_mensagens = [{tipo: INFO, texto: msg}]
    },
    addWarn(msg) {
      this.lista_mensagens = [{tipo: WARN, texto: msg}]
    },
    addSucess(msg) {
      this.lista_mensagens = [{tipo: SUCESS, texto: msg}]
    },
    limpar() {
      this.lista_mensagens = []
    }
  }
}
</script>

<style>
.erro{
  color: red
}
.info{
  color: black
}
.warn{
  color: yellow
}
.sucess{
  color: green
}
</style>