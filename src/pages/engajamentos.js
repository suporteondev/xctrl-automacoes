import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/gerenciador/hooks/perfis'
import { Engajamentos } from '../features/engajamentos'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-gerenciador')
    }, [])

    return (
        <PerfisProvider>
            <Esquema>
                <Engajamentos/>
            </Esquema>
        </PerfisProvider>
    )
}