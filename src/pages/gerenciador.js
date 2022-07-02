import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gerenciador } from '../features/gerenciador/index'
import { Esquema } from '../components/esquema/index'
import { PerfisProvider } from '../features/gerenciador/hooks/perfis'
import { deslogado } from '../functions/deslogado'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        deslogado(Router, 'tamanho-gerenciador')
    }, [Router])

    return (
        <PerfisProvider>
            <Esquema>
                <Gerenciador/>
            </Esquema>
        </PerfisProvider>
    )
}