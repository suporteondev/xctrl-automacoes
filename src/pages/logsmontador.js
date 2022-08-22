import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { LogsMontador } from '../features/logsmontador'

export default function Page(){
    return (
        <Esquema>
            <LogsMontador/>
        </Esquema>
    )
}