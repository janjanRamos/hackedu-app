/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('configuracaoPdi')
        .then(response =>{
            return response
        })
    },
    salvar:(configuracao) => {
        let alteracao = configuracao.id
        if(alteracao){
            return http.put('configuracaoPdi/'+ configuracao.id, configuracao)
        }else{
            return http.post('configuracaoPdi', configuracao)
        }
    },
    inativar:(configuracao) => {
        return http.put('configuracaoPdi/inativar/'+ configuracao.id, configuracao)
    },
    remover:(configuracao) => {
        return http.delete('configuracaoPdi/'+ configuracao.id)
    }
}