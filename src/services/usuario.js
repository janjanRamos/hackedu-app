/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('usuario')
        .then(response =>{
            return response
        })
    },
    salvar:(usuario) => {
        let alteracao = usuario.id
        if(alteracao){
            return http.put('usuario/'+ usuario.id, usuario)
        }else{
            return http.post('usuario', usuario)
        }
    },
    inativar:(usuario) => {
        return http.put('usuario/inativar/'+ usuario.id, usuario)
    },
    remover:(usuario) => {
        return http.delete('usuario/'+ usuario.id)
    },
    buscarPorLogin:(usuario) => {
        return http.post('usuario/logar/',usuario)
    },
    definirNovaSenha:(usuario) =>{
        return http.get('usuario/redefinirSenha/'+usuario.email)
        .then(response =>{
            return response
        })
    }
}