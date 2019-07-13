<template>
  <div>
    <div v-for="(msg, index) of lista_mensagens" :key="index"
        class="div-mensagem" v-bind:class="msg.tipo" >
      <span style="white-space: pre-line;">{{msg.texto}}</span>
    </div>
  </div>
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
  border-color: red;
  color: red;
}
.info{
  border-color: black;
  color: black;
}
.warn{
  border-color: yellow;
  color: yellow;
}
.sucess{
  border-color: green;
  color: green;
}
.div-mensagem{
  padding-top: 15px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  border-bottom: 1px dotted;
  font-size: 15px !important;
}
</style>