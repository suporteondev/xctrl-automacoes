import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Esquema } from '../components/esquema/index'
import { Suporte } from '../features/suporte'
import { deslogado } from '../functions/deslogado'

export default function Page(){

    const Router = useNavigate()

    useEffect(()=>{
        deslogado(Router, 'tamanho-medio')
    }, [Router])

    return (
        <Esquema>
            <Suporte/>
        </Esquema>
    )
}