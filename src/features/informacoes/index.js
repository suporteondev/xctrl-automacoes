import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Conteudos } from './components/conteudos'
import { Formulario } from './components/formulario'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Mensagem } from './components/mensagem'
import { Botao } from './components/botao'
import { Cabeca } from '../../components/cabeca/index'
import { Rodape } from '../../components/rodape/index'
import { Opcao } from '../../components/opcao/index'
import { Titulo } from './components/titulo'
import { useUsuarioLogado } from '../../providers/usuarioLogado'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { useAcessoCriador } from '../../providers/acessoCriador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { redirecionar } from '../../functions/redirecionar'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { TbLockOpen } from 'react-icons/tb'
import { atualizarInformacoes } from './functions/atualizarInformacoes'

const Informacoes = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem color='#fff'></Mensagem>)
    const Router = useNavigate()

    return (
        <Conteudos>
            <Cabeca voltar='/painel'/>
            <Formulario 
                onSubmit={e => atualizarInformacoes(
                    e, 
                    Router,
                    document.querySelector('[name="nome"]').value,
                    document.querySelector('[name="senha"]').value, 
                    document.querySelector('[name="confirmar"]').value, 
                    Mensagem,
                    setMensagem
                )}
            >
                <Titulo>Minhas informações</Titulo>
                <Caixa>
                    <Etiqueta>Nome e sobrenome</Etiqueta>
                    <Entrada 
                        name='nome' 
                        type='text'
                    />
                </Caixa>
                <Caixa>
                    <Etiqueta>Senha</Etiqueta>
                    <Entrada 
                        name='senha' 
                        type='password'
                    />
                </Caixa>
                <Caixa>
                    <Etiqueta>Confirmar senha</Etiqueta>
                    <Entrada 
                        name='confirmar' 
                        type='password'
                    />
                </Caixa>
                {mensagem}
                <Botao id='teste'>Salvar alterações</Botao>
            </Formulario>
            <Rodape>
                V{window.api.ipcRenderer.sendSync('versaoAplicativo')}
            </Rodape>
        </Conteudos>
    )
}

export { Informacoes }