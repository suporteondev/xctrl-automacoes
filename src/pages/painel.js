import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Painel } from '../features/painel/index'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Painel/>
        </Esquema>
    )
}