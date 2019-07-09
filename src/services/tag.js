/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('tag')
        .then(response =>{
            return response
        })
    },
    salvar:(tag) => {
        let alteracao = tag.id
        if(alteracao){
            return http.put('tag/'+ tag.id, tag)
        }else{
            return http.post('tag', tag)
        }
    },
    remover:(tag) => {
        return http.delete('tag/'+ tag.id)
    }
}