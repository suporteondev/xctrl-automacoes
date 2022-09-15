import { useEffect } from 'react'
import { ControleVps } from '../features/controlevps/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/gerenciador/hooks/perfis'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <PerfisProvider>
            <Esquema>
                <ControleVps/>
            </Esquema>
        </PerfisProvider>
    )
}