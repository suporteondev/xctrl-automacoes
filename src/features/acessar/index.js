import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { Titulo } from './components/titulo'
import { useUsuarioLogado } from '../../providers/usuarioLogado'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { useAcessoCriador } from '../../providers/acessoCriador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { Div } from './components/div'
import { redirecionar } from '../../functions/redirecionar'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { Opcao } from '../../components/opcao'
import { FaYoutube } from 'react-icons/fa'

const Acessar = ()=>{

    const { usuarioLogado, setUsuarioLogado } = useUsuarioLogado()
    const { setAcessoGerenciador } = useAcessoGerenciador()
    const { setAcessoCriador } = useAcessoCriador()
    const { setAcessoMontador } = useAcessoMontador()
    const [ mensagem, setMensagem ] = useState(<Mensagem color='#fff'></Mensagem>)
    const Router = useNavigate()

    return (
        <Conteudos>
            <Cabeca voltar='false'/>
            <Formulario 
                onSubmit={e => acessarPlataforma(
                    e, 
                    Router,
                    document.querySelector('[name="email"]').value, 
                    document.querySelector('[name="senha"]').value, 
                    Mensagem,
                    setMensagem, 
                    setUsuarioLogado,
                    setAcessoGerenciador,
                    setAcessoCriador,
                    setAcessoMontador
                )}
            >
                <Titulo>Acessar plataforma</Titulo>
                <Caixa>
                    <Etiqueta>Email</Etiqueta>
                    <Entrada 
                        name='email' 
                        type='text' 
                        placeholder='Digite seu email...'
                        defaultValue={usuarioLogado.email}
                    />
                </Caixa>
                <Caixa>
                    <Etiqueta>Senha</Etiqueta>
                    <Entrada 
                        name='senha' 
                        type='password' 
                        placeholder='Digite sua senha...'
                        defaultValue={usuarioLogado.senha}
                    />
                </Caixa>
                {mensagem}
                <Botao>Acessar conta</Botao>
            </Formulario>
            <Rodape>
                
                <Opcao funcao={()=> { abrirNavegador('https://www.youtube.com/watch?v=cEaMcyr3cdI')}}>
                    <span>Manual de uso</span>
                    <FaYoutube/>
                </Opcao>
                V1.0.0
            </Rodape>
        </Conteudos>
    )
}

export { Acessar }