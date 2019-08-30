<template>
  <div class="container-home">
    <form>
      <md-card>
        <md-card-header>
          <div class="md-title">Cadastre-se</div>
        </md-card-header>

        <md-card-content>
          <mensagem ref="msg"/>

          <md-field>
            <label>Nome</label>
            <md-input type="text" v-model="usuario.pessoa.nome" required/>
          </md-field>

          <md-field :class="classInputCpf">
            <label>CPF</label>
            <input-mask mask="999.999.999-99" v-model="usuario.pessoa.cpf" class="md-input" @focus="focarInputCpf" @blur="desfocarInputCpf"/>
          </md-field>
          
          <md-field>
            <label>Email</label>
            <md-input type="text" v-model="usuario.pessoa.email" required/>
          </md-field>

          <md-field :md-toggle-password="false">
            <label>Senha</label>
            <md-input type="password" v-model="usuario.senha" required/>
          </md-field>

          <md-field :md-toggle-password="false">
            <label>Repita a senha</label>
            <md-input type="password" v-model="usuario.confirmacaoSenha" required/>
          </md-field>
        </md-card-content>

        <md-card-actions>          
          <md-button class="md-raised" to="/login">
            <i class="material-icons">chevron_left</i>&nbsp;
            <span>Voltar</span>
          </md-button>
          <md-button class="md-raised md-primary" @click="cadastrar()">
            <span>Cadastrar</span>
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
            senha: "",
            confirmacaoSenha: "",
            pessoa:{
              nome: "",
              cpf: "",
              email: ""
            }
          },
          classInputCpf: "md-required"
        }
      },
      methods: {
          /* eslint-disable */
          cadastrar(){
            Usuario.salvar(this.usuario)
            .then(resposta => {
              this.usuario = {}
              this.$refs.msg.addSucess('Usuário cadastro com sucesso!')
            }).catch(erro => {
              this.$refs.msg.addErro(erro)
            })        
          },
          focarInputCpf: function (event){
            this.classInputCpf = "md-required md-focused"
          },
          desfocarInputCpf: function (event){
            this.classInputCpf = "md-required"
            if(event.target.value != ""){
              this.classInputCpf = "md-required md-has-value"
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