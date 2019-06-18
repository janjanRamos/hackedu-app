/* eslint-disable no-console */
import {http} from './config'

export default{
    listar:() => {
        return http.get('pessoas')
        .then(response =>{
            return response
        })
    },
    salvar:(pessoa) => {
        return http.post('pessoa', pessoa)
    }
}