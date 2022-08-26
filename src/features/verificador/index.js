import { Conteudos } from './components/conteudos'
import { Configuracoes } from './components/configuracoes'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Opcao } from '../../components/opcao'
import { Select } from './components/select'
import { iniciar } from './functions/iniciar'
import { Mensagem } from './components/mensagem'
import { useState } from 'react'
import { useConfiguracoesVerificador } from '../../providers/configuracoesVerificador'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { FaYoutube } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { userAgentsMobile } from '../../userAgentsMobile'

const Verificador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const { acessoGerenciador } = useAcessoGerenciador()
    const { configuracoesVerificador, setConfiguracoesVerificador } = useConfiguracoesVerificador()
    const listaDeUserAgentsMobile = [...new Set(userAgentsMobile)]

    return (
        <>
            <Cabeca voltar='/gerenciador'/>
            <Conteudos>
                <Titulo>Verificador de perfis</Titulo>
                <Configuracoes>
                    <Caixa>
                        <Etiqueta>Navegador</Etiqueta>
                        <Select name='navegador' defaultValue={configuracoesVerificador.navegador}>
                            <option value='google'>Google Chrome</option>
                            <option value='edge'>Edge</option>
                            <option value='brave'>Brave</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Ver acontecendo</Etiqueta>
                        <Select name='verAcontecendo' defaultValue={configuracoesVerificador.verAcontecendo}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Navegador em modo anônimo</Etiqueta>
                        <Select name='modoAnonimo' defaultValue={configuracoesVerificador.modoAnonimo}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>User Agent</Etiqueta>
                        <Select name='userAgent' defaultValue={configuracoesVerificador.userAgent}>
                            <option value='aleatorio'>Aleatório</option>
                            {listaDeUserAgentsMobile.map((userAgent, index)=> (
                                <option key={index} value={userAgent}>User Agent - {index + 1}</option>
                            ))}
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Coloque seus perfis em</Etiqueta>
                        <Select name='modoPerfis' defaultValue={configuracoesVerificador.modoPerfis}>
                            <option value='linha'>Modo linha</option>
                            <option value='coluna'>Modo coluna</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Seus perfis</Etiqueta>
                        <Textarea name='seusPerfis' defaultValue={configuracoesVerificador.seusPerfis}></Textarea>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Limpar atividade de login</Etiqueta>
                        <Select name='limparLogin' defaultValue={configuracoesVerificador.limparLogin}>
                            <option value='sim'>Sim</option>
                            <option value='nao'>Não</option>
                        </Select>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Esperar entre as ações (Segundos)</Etiqueta>
                        <Entrada name='esperarEntre' type='number' min={0} defaultValue={configuracoesVerificador.esperarEntre}/>
                    </Caixa>
                    {mensagem}
                </Configuracoes>
            </Conteudos>
            <Rodape>
                <Opcao>
                    {acessoGerenciador.data == 'Sem acesso' ? 
                        ''
                        :
                        <span>
                            {acessoGerenciador.data == 'permanente' ? 'Acesso permanente' : 'Seu plano expira dia ' + acessoGerenciador.data}
                        </span>
                    }
                    <IoTime/>
                </Opcao>
                <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesVerificador) }}>
                    <span>Salvar configurações</span>
                    <IoIosSave/>
                </Opcao>
                <Opcao funcao={()=>{ 
                    salvar(Mensagem, setMensagem, setConfiguracoesVerificador)
                    iniciar(Mensagem, setMensagem) 
                }}>
                    <span>Iniciar</span>
                    <IoPlay/>
                </Opcao>
            </Rodape>
        </>
    )
}

export { Verificador }