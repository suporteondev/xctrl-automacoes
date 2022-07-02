import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Esquema } from '../components/esquema/index'
import { Acessar } from '../features/acessar/index'
import { logado } from '../functions/logado'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        logado(Router, 'tamanho-medio')
    }, [Router])

    return (
        <Esquema>
            <Acessar/>
        </Esquema>
    )
}