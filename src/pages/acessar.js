import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { Acessar } from '../features/acessar/index'

export default function Page(){
    return (
        <Esquema>
            <Acessar/>
        </Esquema>
    )
}