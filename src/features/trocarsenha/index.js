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
import { useConfiguracoesTrocarSenha } from '../../providers/configuracoesTrocarSenha'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { FaYoutube } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { userAgentsMobile } from '../../userAgentsMobile'
import { usePerfisSelecionadosGerenciador } from '../../providers/perfisSelecionadosGerenciador'

const TrocarSenha = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const { acessoGerenciador } = useAcessoGerenciador()
    const { configuracoesTrocarSenha, setConfiguracoesTrocarSenha } = useConfiguracoesTrocarSenha()
    const { perfisSelecionadosGerenciador, setPerfisSelecionadosGerenciador } = usePerfisSelecionadosGerenciador()
    const listaDeUserAgentsMobile = [...new Set(userAgentsMobile)]
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ executando, setExecutando ] = useState(false)
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ senhasAlteradas, setSenhasAlteradas ] = useState(0)
    const [ senhasNaoAlteradas, setSenhasNaoAlteradas ] = useState(0)

    return (
        <>
            {
                executando == false ?
                <>
                    <Cabeca voltar='/gerenciador'/>
                    <Conteudos>
                        <Titulo>Trocar senha dos perfis</Titulo>
                        <Configuracoes>
                            <Caixa>
                                <Etiqueta>Navegador</Etiqueta>
                                <Select name='navegador' defaultValue={configuracoesTrocarSenha.navegador}>
                                    <option value='google'>Google Chrome</option>
                                    <option value='edge'>Edge</option>
                                    <option value='brave'>Brave</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Ver acontecendo</Etiqueta>
                                <Select name='verAcontecendo' defaultValue={configuracoesTrocarSenha.verAcontecendo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Navegador em modo anônimo</Etiqueta>
                                <Select name='modoAnonimo' defaultValue={configuracoesTrocarSenha.modoAnonimo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>User Agent</Etiqueta>
                                <Select name='userAgent' defaultValue={configuracoesTrocarSenha.userAgent}>
                                    <option value='aleatorio'>Aleatório</option>
                                    {listaDeUserAgentsMobile.map((userAgent, index)=> (
                                        <option key={index} value={userAgent}>User Agent - {index + 1}</option>
                                    ))}
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Coloque seus perfis em</Etiqueta>
                                <Select name='modoPerfis' defaultValue={configuracoesTrocarSenha.modoPerfis}>
                                    <option value='linha'>Modo linha</option>
                                    <option value='coluna'>Modo coluna</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Nova senha</Etiqueta>
                                <Entrada name='novaSenha' type='text' defaultValue={configuracoesTrocarSenha.novaSenha}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Limpar atividade de login</Etiqueta>
                                <Select name='limparLogin' defaultValue={configuracoesTrocarSenha.limparLogin}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre as ações (Segundos)</Etiqueta>
                                <Entrada name='esperarEntre' type='number' min={0} defaultValue={configuracoesTrocarSenha.esperarEntre}/>
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
                        <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesTrocarSenha) }}>
                            <span>Salvar configurações</span>
                            <IoIosSave/>
                        </Opcao>
                        <Opcao funcao={()=>{
                            iniciar(
                                Mensagem, 
                                setMensagem,
                                setMeusLogs,
                                setDisplayVoltar,
                                setExecutando,
                                setSenhasAlteradas,
                                setSenhasNaoAlteradas,
                                perfisSelecionadosGerenciador
                            ) 
                        }}>
                            <span>Iniciar</span>
                            <IoPlay/>
                        </Opcao>
                    </Rodape>
                </>
                :
                <>
                <Cabeca voltar={displayVoltar}/>
                <Logs>
                    {meusLogs.map((logs, index)=>(
                        logs === 'Acessando o instagram' || 
                        logs === 'Verificando o perfil' || 
                        logs === 'Trocando a senha do perfil' ||
                        logs === 'Limpando atividade de login' ||
                        logs === 'O robô terminou, pode voltar!' ? 
                        <h1 key={index}>{logs}</h1> : 
                        <p key={index} style={{ color: logs.includes('sucesso') ? '#28a745' : '' }}>{logs}</p>
                    ))}
                </Logs>
                <Rodape>
                    <Opcao cor='#05A660'>
                        <span>Senhas alteradas</span>
                        {senhasAlteradas}
                    </Opcao>
                    <Opcao cor='#E53535'>
                        <span>Senhas não alteradas</span>
                        {senhasNaoAlteradas}
                    </Opcao>
                </Rodape>
            </>
            }
        </>
    )
}

export { TrocarSenha }