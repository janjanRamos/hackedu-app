/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('configuracaoPdi')
        .then(response =>{
            return response
        })
    },
    salvar:(configuracaoPdi) => {
        let alteracao = configuracaoPdi.id
        if(alteracao){
            return http.put('configuracaoPdi/'+ configuracaoPdi.id, configuracaoPdi)
        }else{
            return http.post('configuracaoPdi', configuracaoPdi)
        }
    },
    remover:(configuracaoPdi) => {
        return http.delete('configuracaoPdi/'+ configuracaoPdi.id)
    }
}