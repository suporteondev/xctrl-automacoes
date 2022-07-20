import { useEffect } from 'react'
import { Gerenciador } from '../features/gerenciador/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/gerenciador/hooks/perfis'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-gerenciador')
    }, [])

    return (
        <PerfisProvider>
            <Esquema>
                <Gerenciador/>
            </Esquema>
        </PerfisProvider>
    )
}