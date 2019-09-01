<template>
  <div class="container-home">
    
    <form>
      <md-card>
        <md-card-area>
          <md-card-header>
            <div class="md-title">Login</div>
          </md-card-header>

          <md-card-content>
            <mensagem ref="msg"/>

            <md-field>
              <label>Usuário</label>
              <md-input type="text" v-model="usuario.login"/>
            </md-field>

            <md-field :md-toggle-password="false">
              <label>Senha</label>
              <md-input type="password" v-model="usuario.senha"/>
              <span class="md-helper-text"><router-link to="/senha">Esqueceu a senha?</router-link></span>
            </md-field>
          </md-card-content>

          <md-card-actions>          
            <md-button class="md-raised md-primary" @click="login()">
                <span>Entrar</span>
            </md-button>
          </md-card-actions>
        </md-card-area>

        <md-card-content>
          <span class="md-helper-text">Não tem conta? <router-link to="/autocadastro">Cadastre-se</router-link></span>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Usuario from '@/services/usuario.js'
    export default {
      /* eslint-disable */
      data() {
        return {  
          usuario:{
            login: "",
            senha: ""
          }
        }
      },
      methods: {
          ...mapMutations([
            'setAutenticado'
          ]),
          login() {
            // this.setAutenticado(this.usuario.login);
            // this.$router.push("home");
            if(this.usuario.login == "" || this.usuario.senha == ""){
              this.$refs.msg.addErro("Usuário e/ou senha inválidos.")
            }else{
              Usuario.buscarPorLogin(this.usuario)
              .then(resposta => {
                this.setAutenticado(this.usuario.login)
                this.$router.push("home")
              }).catch(erro => {
                this.$refs.msg.addErro(erro)
              })
            }
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