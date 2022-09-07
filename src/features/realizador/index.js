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
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { userAgentsMobile } from '../../userAgentsMobile'
import { useConfiguracoesRealizador } from '../../providers/configuracoesRealizador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { Logs } from './components/logs'

const Realizador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const { acessoMontador } = useAcessoMontador()
    const { configuracoesRealizador, setConfiguracoesRealizador } = useConfiguracoesRealizador()
    const listaDeUserAgentsMobile = [...new Set(userAgentsMobile)]
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ executando, setExecutando ] = useState(false)
    const [ fotosPerfisNumero, setFotosPerfisNumero ] = useState(0)
    const [ biografiasAlteradasNumero, setBiografiasAlteradasNumero ] = useState(0)
    const [ publicacoesRealizadasNumero, setPublicacoesRealizadasNumero ] = useState(0)
    const [ publicacoesStoryNumero, setPublicacoesStoryNumero ] = useState(0)
    const [ perfisSeguidosNumero, setPerfisSeguidosNumero ] = useState(0)

    return (
        <>
            {
                executando == false ?
                <>
                    <Cabeca voltar='/painel'/>
                    <Conteudos>
                        <Titulo>Realizador de ações</Titulo>
                        <Configuracoes>
                            <Caixa>
                                <Etiqueta>Navegador</Etiqueta>
                                <Select name='navegador' defaultValue={configuracoesRealizador.navegador}>
                                    <option value='google'>Google Chrome</option>
                                    <option value='edge'>Edge</option>
                                    <option value='brave'>Brave</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Ver acontecendo</Etiqueta>
                                <Select name='verAcontecendo' defaultValue={configuracoesRealizador.verAcontecendo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Navegador em modo anônimo</Etiqueta>
                                <Select name='modoAnonimo' defaultValue={configuracoesRealizador.modoAnonimo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>User Agent</Etiqueta>
                                <Select name='userAgent' defaultValue={configuracoesRealizador.userAgent}>
                                    <option value='aleatorio'>Aleatório</option>
                                    {listaDeUserAgentsMobile.map((userAgent, index)=> (
                                        <option key={index} value={userAgent}>User Agent - {index + 1}</option>
                                    ))}
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Coloque seus perfis em</Etiqueta>
                                <Select name='modoPerfis' defaultValue={configuracoesRealizador.modoPerfis}>
                                    <option value='linha'>Modo linha</option>
                                    <option value='coluna'>Modo coluna</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Seus perfis</Etiqueta>
                                <Textarea name='seusPerfis' defaultValue={configuracoesRealizador.seusPerfis}></Textarea>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Vincular perfis não cadastrados</Etiqueta>
                                <Select name='vincularPerfisNaoCadastrados' defaultValue={configuracoesRealizador.vincularPerfisNaoCadastrados}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Assistir Story a cada "X" ações</Etiqueta>
                                <Entrada name='assistirStoryEntreXAcoes' type='number' min={1} defaultValue={configuracoesRealizador.assistirStoryEntreXAcoes}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Assistir Story por "X" segundos</Etiqueta>
                                <Entrada name='assistirStoryPorXSegundos' type='number' min={1} defaultValue={configuracoesRealizador.assistirStoryPorXSegundos}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Realizar quantas ações por perfil?</Etiqueta>
                                <Entrada name='quantidadeAcoes' type='number' min={1} defaultValue={configuracoesRealizador.quantidadeAcoes}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre cada ação (Segundos)</Etiqueta>
                                <Entrada name='esperarEntreAcoes' type='number' min={1} defaultValue={configuracoesRealizador.esperarEntreAcoes}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Limpar atividade de login</Etiqueta>
                                <Select name='limparLogin' defaultValue={configuracoesRealizador.limparLogin}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Em qual plataforma?</Etiqueta>
                                <Select name='qualPlataforma' defaultValue={configuracoesRealizador.qualPlataforma}>
                                    <option value='gni'>Ganhar no insta</option>
                                    <option value='dizu'>Dizu</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Email da plataforma</Etiqueta>
                                <Entrada name='emailPlataforma' type='email' defaultValue={configuracoesRealizador.emailPlataforma}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Senha da plataforma</Etiqueta>
                                <Entrada name='senhaPlataforma' type='password' defaultValue={configuracoesRealizador.senhaPlataforma}/>
                            </Caixa>
                            {mensagem}
                        </Configuracoes>
                    </Conteudos>
                    <Rodape>
                        <Opcao>
                            {acessoMontador.data == 'Sem acesso' ? 
                                ''
                                :
                                <span>
                                    {acessoMontador.data == 'permanente' ? 'Acesso permanente' : 'Seu plano expira dia ' + acessoMontador.data}
                                </span>
                            }
                            <IoTime/>
                        </Opcao>
                        <Opcao funcao={()=>{ 
                            salvar(
                                Mensagem, 
                                setMensagem, 
                                setConfiguracoesRealizador
                            )
                        }}>
                            <span>Salvar configurações</span>
                            <IoIosSave/>
                        </Opcao>
                        <Opcao funcao={()=>{ 
                            iniciar(
                                Mensagem, 
                                setMensagem, 
                                setExecutando, 
                                setMeusLogs,
                                setDisplayVoltar
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
                        logs === 'Acessando o Ganhar nas Redes' ||
                        logs === 'Acessando a DIZU' ||
                        logs === 'Adicionando o perfil na plataforma' ||
                        logs === 'Acessando a página de ações' ||
                        logs === 'Iniciando as ações da plataforma' ||
                        logs === 'Buscando ações na plataforma' ||
                        logs === 'Realizando ações na plataforma' ||
                        logs === 'Limpando atividade de login' ||
                        logs === 'O robô terminou, pode voltar!' ? 
                        <h1 key={index}>{logs}</h1> : 
                        <p key={index} style={{ color: logs.includes('sucesso') ? '#28a745' : '' }}>{logs}</p>
                    ))}
                </Logs>
                <Rodape>
                    <Opcao>
                        <span>Fotos de perfil alteradas</span>
                        {fotosPerfisNumero}
                    </Opcao>
                    <Opcao>
                        <span>Biografias alteradas</span>
                        {biografiasAlteradasNumero}
                    </Opcao>
                    <Opcao>
                        <span>Publicações no Feed</span>
                        {publicacoesRealizadasNumero}
                    </Opcao>
                    <Opcao>
                        <span>Perfis seguidos</span>
                        {perfisSeguidosNumero}
                    </Opcao>
                    <Opcao>
                        <span>Publicações no Story</span>
                        {publicacoesStoryNumero}
                    </Opcao>
                </Rodape>
            </>
            }
        </>
    )
}

export { Realizador }