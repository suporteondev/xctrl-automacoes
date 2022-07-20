import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Comprar } from '../features/comprar'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Comprar/>
        </Esquema>
    )
}