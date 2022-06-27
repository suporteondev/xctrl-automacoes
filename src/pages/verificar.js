import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Verificar } from '../features/verificar/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/verificar/hooks/perfis'
import { Rodape } from '../components/rodape'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        if(
            window.api.ipcRenderer.sendSync('logado') === undefined || 
            window.api.ipcRenderer.sendSync('logado') === 'undefined'
        ){
            Router('/')
        }
    }, [Router])

    return (
        <PerfisProvider>
            <Esquema ativo='acessar' rodape='false'>
                <Verificar />
            </Esquema>
        </PerfisProvider>
    )
}