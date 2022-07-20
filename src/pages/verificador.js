import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Verificador } from '../features/verificador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])
    
    return (
        <Esquema>
            <Verificador/>
        </Esquema>
    )
}