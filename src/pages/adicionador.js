import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Adicionador } from '../features/adicionador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])
    
    return (
        <Esquema>
            <Adicionador/>
        </Esquema>
    )
}