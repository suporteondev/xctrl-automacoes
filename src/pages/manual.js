import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Manual } from '../features/manual/index'

export default function Page(){

    useEffect(()=>{
        window.api.ipcRenderer.sendSync('tamanho-manual')
    }, [])

    return (
        <Esquema>
            <Manual/>
        </Esquema>
    )
}