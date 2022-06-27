import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmail } from '../../providers/email'
import { useNome } from '../../providers/nome'
import { Conteudos } from './components/conteudos'
import { Formulario } from './components/formulario'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Mensagem } from './components/mensagem'
import { Botao } from './components/botao'
import { acessarPlataforma } from './functions/acessarPlataforma'
import { Cabeca } from '../../components/cabeca/index'
import { Rodape } from '../../components/rodape/index'

const Acessar = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem color='#fff'></Mensagem>)
    const [ emailDigitado, setEmailDigitado ] = useState('')
    const [ senhaDigitada, setSenhaDigitada ] = useState('')
    const { setNome } = useNome()
    const { setEmail } = useEmail()
    const Router = useNavigate()

    return (
        <Conteudos>
            <Cabeca voltar='false'/>
            <Formulario 
                onSubmit={e => acessarPlataforma(
                    e, 
                    emailDigitado, 
                    senhaDigitada, 
                    setMensagem, 
                    setNome, 
                    Router, 
                    setEmail, 
                    Mensagem
                )}
            >
                <Caixa>
                    <Etiqueta>Email</Etiqueta>
                    <Entrada 
                        onChange={(e)=> setEmailDigitado(e.target.value)} 
                        name='email' 
                        type='text' 
                        placeholder='Digite seu email...' 
                        value={emailDigitado}
                    />
                </Caixa>
                <Caixa>
                    <Etiqueta>Senha</Etiqueta>
                    <Entrada 
                        onChange={(e)=> setSenhaDigitada(e.target.value)} 
                        name='senha' 
                        type='password' 
                        placeholder='Digite sua senha...' 
                        value={senhaDigitada}
                    />
                </Caixa>
                {mensagem}
                <Botao>Acessar conta</Botao>
            </Formulario>
            <Rodape>Acessar</Rodape>
        </Conteudos>
    )
}

export { Acessar }