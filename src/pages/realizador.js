import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Realizador } from '../features/realizador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Realizador/>
        </Esquema>
    )
}