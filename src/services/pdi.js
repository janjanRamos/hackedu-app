/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('pdi')
        .then(response =>{
            return response
        })
    },
    salvar:(pdi) => {
        let alteracao = pdi.id
        if(alteracao){
            return http.put('pdi/'+ pdi.id, pdi)
        }else{
            return http.post('pdi', pdi)
        }
    },
    inativar:(pdi) => {
        return http.put('pdi/inativar/'+ pdi.id, pdi)
    },
    remover:(pdi) => {
        return http.delete('pdi/'+ pdi.id)
    }
}