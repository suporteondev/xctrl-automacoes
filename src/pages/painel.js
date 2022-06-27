import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServicosProvider } from '../features/painel/hooks/servicos'
import { Esquema } from '../components/esquema/index'
import { Painel } from '../features/painel/index'

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
        <ServicosProvider>
            <Esquema cabeca='2' ativo='painel'>
                <Painel/>
            </Esquema>
        </ServicosProvider>
    )
}