/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('pessoa')
        .then(response =>{
            return response
        })
    },
    salvar:(pessoa) => {
        let alteracao = pessoa.id
        if(alteracao){
            return http.put('pessoa/'+ pessoa.id, pessoa)
        }else{
            return http.post('pessoa', pessoa)
        }
    },
    inativar:(pessoa) => {
        return http.put('pessoa/inativar/'+ pessoa.id, pessoa)
    },
    remover:(pessoa) => {
        return http.delete('pessoa/'+ pessoa.id)
    }
}