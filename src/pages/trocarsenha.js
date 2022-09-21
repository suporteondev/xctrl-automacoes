import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { TrocarSenha } from '../features/trocarsenha'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])
    
    return (
        <Esquema>
            <TrocarSenha/>
        </Esquema>
    )
}