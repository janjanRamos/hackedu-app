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
        let alteracao = setor.id
        if(alteracao){
            return http.put('setor/'+ setor.id, setor)
        }else{
            return http.post('setor', setor)
        }
    },
    remover:(setor) => {
        return http.delete('setor/'+ setor.id)
    }
}