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
        return http.post('pessoa', pessoa)
    },
    atualizar:(pessoa) => {
        return http.put('pessoa/'+ pessoa.id, pessoa)
    },
    remover:(pessoa) => {
        return http.delete('pessoa/'+ pessoa.id)
    }
}