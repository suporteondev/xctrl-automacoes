import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Suporte } from '../features/suporte'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Suporte/>
        </Esquema>
    )
}