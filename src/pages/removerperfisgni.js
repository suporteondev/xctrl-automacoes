import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RemoverPerfisGni } from '../features/removerperfisgni/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/removerperfisgni/hooks/perfis'

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
            <Esquema>
                <RemoverPerfisGni />
            </Esquema>
        </PerfisProvider>
    )
}