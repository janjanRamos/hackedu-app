/* eslint-disable no-console*/
import Setor from './setor'
import Pessoa from './pessoa'
import Cargo from './cargo'

export default{
    carregarAutocompleteSetor(){
        return Setor.listar()
        .then(resposta => {
            return resposta.data.map(setor => ({
                'id': setor.id,
                'nome': setor.nome,
                'toLowerCase': () => setor.nome.toLowerCase(),
                'toString': () => setor.nome
            }))
        }).catch(erro => {
            console.log(erro)
            return []
        })
    },

    selecionarSetor(setor){
        if(setor){
            return {
              'id': setor.id,
              'nome': setor.nome,
              'toLowerCase': () => setor.nome.toLowerCase(),
              'toString': () => setor.nome
            }
          }else{
            return ''
        }
    },

    carregarAutocompletePessoa(){
        return Pessoa.listar()
        .then(resposta => {
            return resposta.data.map(pessoa => ({
                'id': pessoa.id,
                'nome': pessoa.nome,
                'toLowerCase': () => pessoa.nome.toLowerCase(),
                'toString': () => pessoa.nome
            }))
        }).catch(erro => {
            console.log(erro)
            return []
        })
    },

    selecionarPessoa(pessoa){
        if(pessoa){
            return {
              'id': pessoa.id,
              'nome': pessoa.nome,
              'toLowerCase': () => pessoa.nome.toLowerCase(),
              'toString': () => pessoa.nome
            }
          }else{
            return ''
        }
    },

    carregarAutocompleteCargo(){
        return Cargo.listar()
        .then(resposta => {
            return resposta.data.map(cargo => ({
                'id': cargo.id,
                'nome': cargo.nome,
                'toLowerCase': () => cargo.nome.toLowerCase(),
                'toString': () => cargo.nome
            }))
        }).catch(erro => {
            console.log(erro)
            return []
        })
    },

    selecionarCargo(cargo){
        if(cargo){
            return {
              'id': cargo.id,
              'nome': cargo.nome,
              'toLowerCase': () => cargo.nome.toLowerCase(),
              'toString': () => cargo.nome
            }
          }else{
            return ''
        }
    }


}