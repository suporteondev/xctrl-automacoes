import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { ComprarCriador } from '../features/comprarcriador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <ComprarCriador/>
        </Esquema>
    )
}