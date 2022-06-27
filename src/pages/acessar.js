import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Esquema } from '../components/esquema/index'
import { Acessar } from '../features/acessar/index'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('logado') !== false &&
            window.api.ipcRenderer.sendSync('logado') !== undefined &&
            window.api.ipcRenderer.sendSync('logado') !== 'undefined'
        ){
            Router('/painel')
        }

        window.api.ipcRenderer.sendSync('tamanho-acessar')
    }, [Router])

    return (
        <Esquema>
            <Acessar/>
        </Esquema>
    )
}