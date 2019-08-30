<template>
  <div class="container-home">
    <form>
      <md-card>
        <md-card-header>
          <div class="md-title">Recupere a senha</div>
        </md-card-header>

        <md-card-content>
          <mensagem ref="msg"/>
          
          <md-field>
            <label>Email</label>
            <md-input type="text" v-model="usuario.email" required/>
          </md-field>
        </md-card-content>

        <md-card-actions>          
          <md-button class="md-raised" to="/login">
            <i class="material-icons">chevron_left</i>&nbsp;
            <span>Voltar</span>
          </md-button>
          <md-button class="md-raised md-primary" @click="definirNovaSenha()">
              <span>Enviar nova senha por email</span>
          </md-button>
        </md-card-actions>
      
      </md-card>
    </form>
  </div>
</template>

<script>
    import Usuario from '@/services/usuario'
    export default {
      data() {
        return {  
          usuario:{
            email: ""
          }
        }
      },
      methods: {
          /* eslint-disable */
          definirNovaSenha() {
            Usuario.definirNovaSenha(this.usuario)
            .then(resposta => {
              this.usuario = {}
              this.$refs.msg.addSucess('Email enviado com sucesso!')
            }).catch(erro => {
              this.$refs.msg.addErro(erro)
            })
          }
      }
    }
</script>

<style>
.md-card {
    width: 400px;
    margin: 10%;
    display: inline-block;
    vertical-align: center;
  }
</style>