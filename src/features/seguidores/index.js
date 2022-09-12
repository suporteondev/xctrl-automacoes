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
import { useEffect, useState } from 'react'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { FaYoutube } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { userAgentsMobile } from '../../userAgentsMobile'
import { useConfiguracoesSeguidores } from '../../providers/configuracoesSeguidores'
import { usePerfisSelecionadosEngajamentos } from '../../providers/perfisSelecionadosEngajamentos'

const Seguidores = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const [ executando, setExecutando ] = useState(false)
    const { acessoGerenciador } = useAcessoGerenciador()
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ ativos, setAtivos ] = useState(0)
    const [ inativos, setInativos ] = useState(0)
    const [ novamentes, setNovamentes ] = useState(0)
    const [ averificar, setAverificar ] = useState(0)
    const { configuracoesSeguidores, setConfiguracoesSeguidores } = useConfiguracoesSeguidores()
    const { perfisSelecionadosEngajamentos } = usePerfisSelecionadosEngajamentos()
    const listaDeUserAgentsMobile = [...new Set(userAgentsMobile)]

    return (
        <>
            {executando == false ? 
                <>
                    <Cabeca voltar='/engajamentos'/>
                    <Conteudos>
                        <Titulo>Enviar seguidores</Titulo>
                        <Configuracoes>
                            <Caixa>
                                <Etiqueta>Navegador</Etiqueta>
                                <Select name='navegador' defaultValue={configuracoesSeguidores.navegador}>
                                    <option value='google'>Google Chrome</option>
                                    <option value='edge'>Edge</option>
                                    <option value='brave'>Brave</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Ver acontecendo</Etiqueta>
                                <Select name='verAcontecendo' defaultValue={configuracoesSeguidores.verAcontecendo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Navegador em modo anônimo</Etiqueta>
                                <Select name='modoAnonimo' defaultValue={configuracoesSeguidores.modoAnonimo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Lista de usuários a serem seguidos</Etiqueta>
                                <Textarea name='usuarios'></Textarea>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre as ações (Segundos)</Etiqueta>
                                <Entrada name='esperarEntre' type='number' max={5} defaultValue={configuracoesSeguidores.esperarEntre}/>
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
                        <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesSeguidores) }}>
                            <span>Salvar configurações</span>
                            <IoIosSave/>
                        </Opcao>
                        <Opcao funcao={()=>{ 
                            iniciar(
                                Mensagem, 
                                setMensagem, 
                                setExecutando, 
                                setMeusLogs, 
                                setAtivos, 
                                setNovamentes, 
                                setInativos, 
                                setAverificar, 
                                setDisplayVoltar,
                                perfisSelecionadosEngajamentos
                            ) 
                        }}>
                            <span>Iniciar</span>
                            <IoPlay/>
                        </Opcao>
                    </Rodape>
                </>
            : <>
                <Cabeca voltar={displayVoltar}/>
                <Logs>
                    {meusLogs.map((logs, index)=>(
                        logs === 'Acessando o instagram' || 
                        logs === 'Verificando o perfil' || 
                        logs === 'Limpando atividade de login' ||
                        logs === 'Seguindo sua lista de perfis' ||
                        logs === 'O robô terminou, pode voltar!' ? 
                        <h1 key={index}>{logs}</h1> : 
                        <p key={index}>{logs}</p>
                    ))}
                </Logs>
                <Rodape>
                    <Opcao cor='#28a745'>
                        <span>Perfis seguidos</span>
                        {ativos}
                    </Opcao>
                    <Opcao cor='#E53535'>
                        <span>Não seguidos</span>
                        {inativos}
                    </Opcao>
                </Rodape>
            </>
            }
        </>
    )
}

export { Seguidores }