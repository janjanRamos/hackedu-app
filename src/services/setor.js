/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('setor')
        .then(response =>{
            return response
        })
    },
    salvar:(setor) => {
        return http.post('setor', setor)
    },
    atualizar:(setor) => {
        return http.put('setor/'+ setor.id, setor)
    },
    remover:(setor) => {
        return http.delete('setor/'+ setor.id)
    }
}