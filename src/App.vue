<template>
  <div>
    <vs-navbar v-model="activeItem" class="nabarx">
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
        <router-link to="/setor">Setor</router-link>
      </vs-navbar-item>
      <vs-navbar-item index="2">
        <router-link to="/pessoa">Pessoa</router-link>
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
  height: 30px !important;
}
.vs-navbar--item a{
  font-size: 1.2rem !important;
}
.vs-navbar {
  padding: 0 50px !important;
}
.vs-navbar--title{
  font-size: 2.0rem !important;
}
</style>