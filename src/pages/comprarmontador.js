import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { ComprarMontador } from '../features/comprarmontador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <ComprarMontador/>
        </Esquema>
    )
}