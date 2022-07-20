import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Criador } from '../features/criador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Criador/>
        </Esquema>
    )
}