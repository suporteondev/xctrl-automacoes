import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Removedor } from '../features/removedor'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Removedor/>
        </Esquema>
    )
}