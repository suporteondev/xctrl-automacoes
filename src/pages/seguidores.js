import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Seguidores } from '../features/seguidores'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])
    
    return (
        <Esquema>
            <Seguidores/>
        </Esquema>
    )
}