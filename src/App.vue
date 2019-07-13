<template>
  <div>
    <vs-navbar v-model="activeItem" class="menu">
      <div slot="title">
        <vs-navbar-title>
          EVOLUA
          <img src="./assets/logo.png" class="logo"/>
        </vs-navbar-title>
      </div>
      
      <vs-navbar-item index="0">
        <router-link to="/">Home</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="1">
        <router-link to="/cargo">Cargo</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <router-link to="/tag">Tag</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="3">
        <router-link to="/setor">Setor</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="4">
        <router-link to="/pessoa">Pessoa</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="5">
        <router-link to="/configuracaopdi">Configurar PDI</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="6">
        <router-link to="/pdi">PDI</router-link>
      </vs-navbar-item>
      <vs-spacer></vs-spacer>
    </vs-navbar>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  data:()=>({
    activeItem: 0
  })
}
</script>

<style>
.logo{
  height: 35px !important;
}
.menu{
  height: 70px; 
  background-color: #1E88E5 !important;
  color: white !important;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2) !important;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2) !important;
  padding: 0 50px !important;
}
.vs-navbar--item a{
  font-size: 1.1rem !important;
  color: white !important;
}
.vs-navbar--title{
  font-size: 2.0rem !important;
}
.container{
  margin-top: 15px;
  padding: 10px 100px;
}
body{
  background-color:white; 
}
.page-title {
  flex: 1 1 auto;
  text-align: center;
  font-size: 1.4rem !important;
}
.right{
  text-align: right;
}
.md-toolbar-section-start{
  margin-left: -25px;
}
.md-button-content{
  display: contents !important;
}
</style>