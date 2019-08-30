<template>
  <div>
    <md-field :class="classInputCpf">
        <label>CPF</label>
        <input-mask mask="999.999.999-99" v-model="cpf" class="md-input" @focus="focarInputCpf" @blur="desfocarInputCpf"/>
    </md-field>
  </div>
</template>

<script>
export default {
  name: "inputcpf",
  data() {
    return {
      classInputCpf: "md-required",
      cpf: ""
    }
  },
  methods:{
    /* eslint-disable */
    focarInputCpf: function (event){
        this.classInputCpf = "md-required md-focused"
    },
    desfocarInputCpf: function (event){
        this.classInputCpf = "md-required"
        if(event.target.value != ""){
            this.classInputCpf = "md-required md-has-value"
        }
        this.$emit('input', this.cpf)
    }
  }
}
</script>

<style>
</style>