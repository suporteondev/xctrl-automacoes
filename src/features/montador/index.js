import { Conteudos } from './components/conteudos'
import { Configuracoes } from './components/configuracoes'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Opcao } from '../../components/opcao'
import tempoIMG from '../../assets/svg/tempo.svg'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import salvarIMG from '../../assets/svg/salvar.svg'
import iniciarIMG from '../../assets/svg/iniciar.svg'
import { Select } from './components/select'
import { iniciar } from './functions/iniciar'
import { Mensagem } from './components/mensagem'
import { useState } from 'react'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useConfiguracoesMontador } from '../../providers/configuracoesMontador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { userAgentsMobile } from '../../userAgentsMobile'
import { FaYoutube } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'

const Montador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const [ executando, setExecutando ] = useState(false)
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const { acessoMontador } = useAcessoMontador()
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ fotosPerfisNumero, setFotosPerfisNumero ] = useState(0)
    const [ biografiasAlteradasNumero, setBiografiasAlteradasNumero ] = useState(0)
    const [ publicacoesRealizadasNumero, setPublicacoesRealizadasNumero ] = useState(0)
    const [ publicacoesStoryNumero, setPublicacoesStoryNumero ] = useState(0)
    const [ perfisSeguidosNumero, setPerfisSeguidosNumero ] = useState(0)
    const { configuracoesMontador, setConfiguracoesMontador } = useConfiguracoesMontador()
    const listaDeUserAgentsMobile = [...new Set(userAgentsMobile)]

    return (
        <>
            {executando == false ? 
                <>
                    <Cabeca voltar='/painel'/>
                    <Conteudos>
                        <Titulo>Montador de perfis</Titulo>
                        <Configuracoes>
                            <Caixa>
                                <Etiqueta>Ver acontecendo</Etiqueta>
                                <Select name='verAcontecendo' defaultValue={configuracoesMontador.verAcontecendo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Navegador em modo anônimo</Etiqueta>
                                <Select name='modoAnonimo' defaultValue={configuracoesMontador.modoAnonimo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>User Agent</Etiqueta>
                                <Select name='userAgent' defaultValue={configuracoesMontador.userAgent}>
                                    <option value='aleatorio'>Aleatório</option>
                                    {listaDeUserAgentsMobile.map((userAgent, index)=> (
                                        <option key={index} value={userAgent}>User Agent - {index + 1}</option>
                                    ))}
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Coloque seus perfis em</Etiqueta>
                                <Select name='modoPerfis' defaultValue={configuracoesMontador.modoPerfis}>
                                    <option value='linha'>Modo linha</option>
                                    <option value='coluna'>Modo coluna</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Seus perfis</Etiqueta>
                                <Textarea name='seusPerfis'></Textarea>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Gênero dos seus perfis</Etiqueta>
                                <Select name='generoPerfis' defaultValue={configuracoesMontador.generoPerfis}>
                                    <option value='feminino'>Feminino</option>
                                    <option value='masculino'>Masculino</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Alterar a foto de perfil</Etiqueta>
                                <Select name='alterarFotoPerfil' defaultValue={configuracoesMontador.alterarFotoPerfil}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Alterar a biografia</Etiqueta>
                                <Select name='alterarBiografia' defaultValue={configuracoesMontador.alterarBiografia}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Quantidade de publicações no feed</Etiqueta>
                                <Entrada name='quantidadePublicacoesFeed' type='number' min={0} defaultValue={configuracoesMontador.quantidadePublicacoesFeed}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Quantidade de publicações no story</Etiqueta>
                                <Entrada name='quantidadePublicacoesStory' type='number' min={0} defaultValue={configuracoesMontador.quantidadePublicacoesStory}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Seguir quantos perfis</Etiqueta>
                                <Entrada name='seguirPerfis' type='number' min={0} defaultValue={configuracoesMontador.seguirPerfis}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Limpar atividade de login</Etiqueta>
                                <Select name='limparLogin' defaultValue={configuracoesMontador.limparLogin}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre as ações (Segundos)</Etiqueta>
                                <Entrada name='esperarEntre' type='number' min={0} defaultValue={configuracoesMontador.esperarEntre}/>
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
                        <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesMontador) }}>
                            <span>Salvar configurações</span>
                            <IoIosSave/>
                        </Opcao>
                        <Opcao funcao={()=>{ iniciar(listaDeUserAgentsMobile, Mensagem, setMensagem, setExecutando, setMeusLogs, setFotosPerfisNumero, setBiografiasAlteradasNumero, setPublicacoesRealizadasNumero, setPublicacoesStoryNumero, setPerfisSeguidosNumero, setDisplayVoltar) }}>
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
                        logs === 'Alterando o gênero do perfil' ||
                        logs === 'Alterando a biografia' || 
                        logs === 'Alterando a foto de perfil' ||
                        logs === 'Postando fotos no story' ||
                        logs === 'Postando fotos no Feed' ||
                        logs === 'Seguindo perfis sugeridos' ||
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
                        <span>Publicações no Story</span>
                        {publicacoesStoryNumero}
                    </Opcao>
                    <Opcao>
                        <span>Perfis seguidos</span>
                        {perfisSeguidosNumero}
                    </Opcao>
                </Rodape>
            </>
            }
        </>
    )
}

export { Montador }