import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Montador } from '../features/montador'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-medio')
    }, [])

    return (
        <Esquema>
            <Montador/>
        </Esquema>
    )
}