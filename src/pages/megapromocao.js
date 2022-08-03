import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { MegaPromocao } from '../features/megapromocao'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <MegaPromocao/>
        </Esquema>
    )
}