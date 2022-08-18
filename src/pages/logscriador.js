import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { LogsCriador } from '../features/logscriador'

export default function Page(){
    return (
        <Esquema>
            <LogsCriador/>
        </Esquema>
    )
}