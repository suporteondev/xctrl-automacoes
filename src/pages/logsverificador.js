import { useEffect } from 'react'
import { Esquema } from '../components/esquema/index'
import { LogsVerificador } from '../features/logsverificador'

export default function Page(){
    return (
        <Esquema>
            <LogsVerificador/>
        </Esquema>
    )
}