/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('cargo')
        .then(response =>{
            return response
        })
    },
    salvar:(cargo) => {
        let alteracao = cargo.id
        if(alteracao){
            return http.put('cargo/'+ cargo.id, cargo)
        }else{
            return http.post('cargo', cargo)
        }
    },
    remover:(cargo) => {
        return http.delete('cargo/'+ cargo.id)
    }
}