<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper white darken-1">
        <span class="brand-logo center">Configurar Pdi</span>
      </div>
    </nav>
    <div class="container">
      
      <mensagem ref="msg"/>

      <form @submit.prevent="salvar">
          <md-field>
            <label>Descrição</label>
            <md-input type="text" v-model="configuracaoPdi.descricao" required/>
          </md-field>

          <md-autocomplete v-model="setor_selecionado" :md-options="autocomplete_setor">
            <label>Setor *</label>
            <template slot="md-autocomplete-item" slot-scope="{ item }">
              {{ item.nome }}
            </template>
            <template slot="md-autocomplete-empty"> 
              <i> Nenhum resultado encontrado</i> 
            </template>
          </md-autocomplete>
          
          <md-field>
            <label>Periodicidade (em meses)</label>
            <md-input type="number" v-model="configuracaoPdi.periodicidadeEmMeses" required/>
          </md-field>

          <md-field>
            <md-switch v-model="configuracaoPdi.ativo">{{ configuracaoPdi.ativo ? 'Ativo' : 'Inativo' }}</md-switch>
          </md-field>

          <div style="text-align: right">
            <button class="waves-effect waves-light btn-small" >
                Salvar
                <i class="material-icons left">save</i>
            </button>
          </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>DESCRIÇÃO</th>
            <th>SETOR</th>
            <th>PERIODICIDADE</th>
            <th>ATIVO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="configuracaoPdi of lista_configuracao" :key="configuracaoPdi.id">
            <td>
              {{configuracaoPdi.descricao}}
            </td>
            <td>
              {{configuracaoPdi.setor.nome}}
            </td>
            <td>
              {{configuracaoPdi.periodicidadeEmMeses}} meses
            </td>
            <td>
              {{configuracaoPdi.ativo ? 'Sim' : 'Não'}}
            </td>
            <td style="text-align: right">
              <button @click="editar(configuracaoPdi)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              &nbsp;
              <button @click="remover(configuracaoPdi)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
          <tr v-if="!lista_configuracao.length">
            <td colspan="3">
              <i>Nenhum resultado encontrado.</i>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>

import ConfiguracaoPdi from '@/services/configuracaoPdi'
import AutocompleteHelper from '@/services/autocompleteHelper'

export default{
  data(){
    return {
      configuracaoPdi:{
        descricao: '',
        setor: {
          id: 0
        },
        periodicidadeEmMeses: null,
        ativo: true
      },
      lista_configuracao: [],
      setor_selecionado: '',
      autocomplete_setor: []
    }
  },
  mounted(){
    this.autocomplete_setor = AutocompleteHelper.carregarAutocompleteSetor()
    console.log('teste')
    console.log(this.autocomplete_setor)
    this.listar()
  },

  methods:{
    /* eslint-disable */
    limpar(){
      this.setor_selecionado = ''
      this.configuracaoPdi = {}
      this.$refs.msg.limpar()
    },
    listar(){
        ConfiguracaoPdi.listar()
        .then(resposta => {
          console.log(resposta.data)
          this.lista_configuracao = resposta.data
        }).catch(erro => {
          this.$refs.msg.addErro(erro)
        })
    },
    salvar(){
      this.configuracaoPdi.setor.id = this.setor_selecionado.id
      ConfiguracaoPdi.salvar(this.configuracaoPdi)
      .then(resposta => {
        this.limpar()
        this.$refs.msg.addSucess('Configuração salva com sucesso!')
        this.listar()
      }).catch(erro => {
        this.$refs.msg.addErro(erro)
      })        
    },
    editar(configuracaoPdi){
      this.configuracaoPdi = configuracaoPdi
      this.setor_selecionado = AutocompleteHelper.selecionarSetor(configuracaoPdi.setor)
    },
    remover(configuracaoPdi){
      if(confirm('Deseja excluir o configuracaoPdi?')){
        ConfiguracaoPdi.remover(configuracaoPdi).then(resposta => {
          this.$refs.msg.addSucess('Configuração removida com sucesso!')
          this.listar()
         }).catch(erro => {
          this.$refs.msg.addErro(erro)
        }) 
      }
    }
  }
}
</script>

<style>
</style>
