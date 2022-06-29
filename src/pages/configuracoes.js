import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Esquema } from '../components/esquema/index'
import { Configuracoes } from '../features/configuracoes'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('logado') === undefined || 
            window.api.ipcRenderer.sendSync('logado') === 'undefined'
        ){
            Router('/')
        }

        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [Router])

    return (
        <Esquema>
            <Configuracoes/>
        </Esquema>
    )
}