<template>
    <div>
        <div class="parentx-static">
        <vs-sidebar static-position hidden-background parent="body" default-index="1" color="primary" class="sidebarx" spacer v-model="active">
            <div class="logo" slot="header">
            <label>EVOLUA</label>
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
                <router-link to="/registrar">Registrar</router-link>
            </vs-sidebar-item>
            </vs-sidebar-group>

            <vs-sidebar-item index="8" class="footer" >
            <vs-button icon="reply" color="danger" type="flat" @click="logout()">
                Sair
            </vs-button>
            </vs-sidebar-item>
            
        </vs-sidebar>
        </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'menuPrivado',
    props: {
        usuarioLogado: String,
        active: false
    },
  computed: mapState({
    autenticado: state => state.autenticado,
    usuarioLogado: state => state.usuarioLogado
  }),
  mounted() {
    this.logout();
  },
  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>