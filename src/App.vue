<template>
  <div>
    <div v-if="!autenticado">

      <header>
          <div>
            <vs-navbar v-model="activeItem" class="nabarx">
              <div slot="title">
                <vs-navbar-title>
                  Edu2GO
                </vs-navbar-title>
              </div>
              <vs-navbar-item index="1">
                <a href="#">CURSOS</a>
              </vs-navbar-item>
              <vs-navbar-item index="2">
                <a href="/login">LOGIN</a>
              </vs-navbar-item>
              <vs-input icon="search" placeholder="Buscar Cursos" v-model="search"/>
            </vs-navbar>
          </div> 

      </header>

      <!-- <header class="cabecalhoPublic vs-navbar vs-navbar-null vs-navbar-color-transparent" 
        style="background-color: transparent; background-position: initial initial; background-repeat: initial initial;">
     
      <vs-navbar-title>
        Edu2GO
      </vs-navbar-title>

      <vs-navbar-item index="0">
        <a href="#">Home</a>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <a href="#">News</a>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <a href="#">Update</a>
      </vs-navbar-item>

        <div class="vs-navbar--header vs-navbar--title">
          EVOLUA
          <img src="./assets/logo.png"/>
        </div>
      </header> -->
    </div>
    
    <div class="parentx-static" id="divSidebar" v-if="autenticado">
      <vs-sidebar static-position hidden-background parent="divSidebar" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
        <div class="logo" slot="header">
          <label>Edu2GO</label>
          <img src="./assets/logo_azul.png" />
        </div>
        
        <div class="header-sidebar" slot="header">
          <label>{{usuarioLogado}}</label>
          <!-- <vs-avatar size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/> -->
        </div>
        
        <vs-sidebar-item index="1" icon="home">
          <router-link to="/home">Home</router-link>
        </vs-sidebar-item>

        <vs-sidebar-group open title="Cadastros">
          <vs-sidebar-item index="2" icon="label">
            <router-link to="/tag">Tag</router-link>
          </vs-sidebar-item>

          <vs-sidebar-item index="3" icon="work">
            <router-link to="/cargo">Cargo</router-link>
          </vs-sidebar-item>

          <vs-sidebar-item index="4" icon="business">
            <router-link to="/setor">Setor</router-link>
          </vs-sidebar-item>

          <vs-sidebar-item index="5" icon="person">
            <router-link to="/pessoa">Pessoa</router-link>
          </vs-sidebar-item>
        </vs-sidebar-group>

        <vs-sidebar-group open title="PDI">
          <vs-sidebar-item index="6" icon="settings">
            <router-link to="/configuracao">Configurar</router-link>
          </vs-sidebar-item>
          <vs-sidebar-item index="7" icon="assessment">
            <router-link to="/pdi">Registrar</router-link>
          </vs-sidebar-item>
        </vs-sidebar-group>

        <vs-sidebar-item index="8" class="footer" >
          <vs-button icon="reply" color="danger" type="flat" @click="logout()">
            Sair
          </vs-button>
        </vs-sidebar-item>
        
      </vs-sidebar>
    </div>

    <div :class="autenticado ? 'cabecalhoPrivado' : ''">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data(){
    return {
      active: false
    }
  },
  mounted() {
    this.logout();
  },
  computed: mapState(['autenticado','usuarioLogado']),
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style>
/* Conteúdo das páginas privadas */
.container{
  margin-top: 15px;
  padding: 10px 100px;
}

/* Cabeçalho das páginas privadas*/
.cabecalhoPrivado{
  position: absolute;
  left:260px; top:0; right:0; bottom:0;
}
.md-dense {
  background-color: #1E88E5 !important;
}
.md-dense h3{
  color:white !important;
  font-family: bold;
}
.page-title {
  flex: 1 1 auto;
  text-align: center;
  font-size: 1.4rem !important;
}

/* Botões das páginas privadas*/
.right{
  text-align: right;
}

/* Menu das páginas privadas*/
.parentx-static{
  overflow: hidden;
  position: fixed;
}
.header-sidebar{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
}
.header-sidebar h4{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.footer > a:hover{
  text-decoration: none !important;
}
.footer > a > a:hover{
  text-decoration: none !important;
}
.footer > a > i{
  color:red;
}
.logo{
  font-size: 2.0rem !important;
  color: #1E88E5;
  float: left;
  padding-left: 40px;
  font-family: bold;
}

/* Menu das páginas públicas*/
.cabecalhoPublic{
  height: 70px; 
  background-color: #1E88E5 !important;
  color: white !important;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2) !important;
  padding: 0 50px !important;
}
.vs-navbar--title{
  font-size: 2.0rem !important;
}
</style>