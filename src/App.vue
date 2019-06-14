<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Pessoa</a>
      </div>
    </nav>
    <div class="container">
      <form>
          <label>Nome</label>
          <input type="text" placeholder="Nome">
          <label>Setor</label>
          <input type="number" placeholder="Setor">
          <label>Cargo</label>
          <input type="text" placeholder="Cargo">
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>SETOR</th>
            <th>CARGO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa of lista_pessoas" :key="pessoa.id">
            <td>{{pessoa.nome}}</td>
            <td>{{pessoa.setor}}</td>
            <td>{{pessoa.cargo}}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import Pessoa from './services/pessoa'

export default{

  data(){
    return {
      lista_pessoas: []
    }
  },

  mounted(){
    // console.log("")
    Pessoa.listar().then(resposta => {
      
      this.lista_pessoas = resposta;
    })
  }
}
</script>

<style>

</style>
