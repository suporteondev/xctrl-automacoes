import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gerenciar } from '../features/gerenciar/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/gerenciar/hooks/perfis'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('logado') === undefined || 
            window.api.ipcRenderer.sendSync('logado') === 'undefined'
        ){
            Router('/')
        }

        window.api.ipcRenderer.sendSync('tamanho-gerenciador')
    }, [Router])

    return (
        <PerfisProvider>
            <Esquema>
                <Gerenciar />
            </Esquema>
        </PerfisProvider>
    )
}