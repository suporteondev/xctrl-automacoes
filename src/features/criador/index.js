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
import { useConfiguracoesCriador } from '../../providers/configuracoesCriador'
import { salvar } from './functions/salvar'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { userAgents } from '../../userAgents'
import { useAcessoCriador } from '../../providers/acessoCriador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'

const Criador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const [ executando, setExecutando ] = useState(false)

    const { acessoCriador } = useAcessoCriador()
    const { acessoMontador } = useAcessoMontador()
    const { acessoGerenciador } = useAcessoGerenciador()

    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ criadasSucesso, setCriadasSucesso ] = useState(0)
    const [ naoCriadas, setNaoCriadas ] = useState(0)
    const { configuracoesCriador, setConfiguracoesCriador } = useConfiguracoesCriador()

    return (
        <>
            {executando == false ? 
                <>
                    <Cabeca voltar='/painel'/>
                    <Conteudos>
                        <Titulo>Criador de perfis</Titulo>
                        <Configuracoes>
                            <Caixa>
                                <Etiqueta>Caminho do navegador</Etiqueta>
                                <Entrada name='caminhoNavegador' type='text' defaultValue={configuracoesCriador.caminhoNavegador}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Modo invisível</Etiqueta>
                                <Select name='modoInvisivel' defaultValue={configuracoesCriador.modoInvisivel}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Modo anônimo</Etiqueta>
                                <Select name='modoAnonimo' defaultValue={configuracoesCriador.modoAnonimo}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>User Agent</Etiqueta>
                                <Select name='userAgent' defaultValue={configuracoesCriador.userAgent}>
                                    <option value='aleatorio'>Aleatório</option>
                                    {userAgents.map((userAgent, x)=>(
                                        <option value={userAgent}>{x + 1}º User Agent</option>
                                    ))}
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Email temporário</Etiqueta>
                                <Select name='emailTemporario' defaultValue={configuracoesCriador.emailTemporario}>
                                    <option value='cryptogmail'>Cryptogmail</option>
                                    <option value='mailtm'>Mail.tm</option>
                                    <option value='fakermail'>Fakermail</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Quantidade de perfis</Etiqueta>
                                <Entrada name='quantidadePerfis' type='number' defaultValue={configuracoesCriador.quantidadePerfis}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Senha dos perfis</Etiqueta>
                                <Entrada name='senhaPerfis' type='text' defaultValue={configuracoesCriador.senhaPerfis}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Gênero dos perfis</Etiqueta>
                                <Select name='generoPerfis' defaultValue={configuracoesCriador.generoPerfis}>
                                    <option value='feminino'>Feminino</option>
                                    <option value='masculino'>Masculino</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Limpar login</Etiqueta>
                                <Select name='limparLogin' defaultValue={configuracoesCriador.limparLogin}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>

                            {acessoGerenciador.status == true ? 
                                <Caixa>
                                    <Etiqueta>Como salvar os perfis</Etiqueta>
                                    <Select name='comoSalvar' defaultValue={configuracoesCriador.comoSalvar}>
                                        <option value='linha'>Modo linha - TXT</option>
                                        <option value='coluna'>Modo coluna - TXT</option>
                                        <option value='gerenciador'>Salvar no gerenciador</option>
                                    </Select>
                                </Caixa>
                                : 
                                <Caixa>
                                    <Etiqueta>Como salvar os perfis</Etiqueta>
                                    <Select name='comoSalvar' defaultValue={configuracoesCriador.comoSalvar}>
                                        <option value='linha'>Modo linha - TXT</option>
                                        <option value='coluna'>Modo coluna - TXT</option>
                                    </Select>
                                </Caixa>
                            }
                            <Caixa>
                                <Etiqueta>Onde salvar os perfis</Etiqueta>
                                <Entrada name='ondeSalvar' type='text' defaultValue={configuracoesCriador.ondeSalvar}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre as criações (Segundos)</Etiqueta>
                                <Entrada name='esperarEntre' type='number' defaultValue={configuracoesCriador.esperarEntre}/>
                            </Caixa>
                            {acessoMontador.status == true ? 
                            <Caixa>
                                <Etiqueta>Usar o montador nos perfis criados</Etiqueta>
                                <Select name='montarPerfis' defaultValue={configuracoesCriador.montarPerfis}>
                                    <option value='sim'>Sim</option>
                                    <option value='nao'>Não</option>
                                </Select>
                            </Caixa>
                            : 
                            ''
                            }
                            {mensagem}
                        </Configuracoes>
                    </Conteudos>
                    <Rodape>
                        <Opcao>
                            {acessoCriador.data == 'Sem acesso' ? 
                                ''
                                :
                                <span>
                                    {acessoCriador.data == 'permanente' ? 'Acesso permanente' : 'Seu plano expira dia ' + acessoCriador.data}
                                </span>
                            }
                            <img src={tempoIMG}/>
                        </Opcao>
                        <Opcao funcao={()=> { abrirNavegador('https://www.youtube.com/watch?v=CAVBLC5Xaxw')}}>
                            <span>Manual de uso</span>
                            <img src={tutorialIMG}/>
                        </Opcao>
                        <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesCriador) }}>
                            <span>Salvar configurações</span>
                            <img src={salvarIMG}/>
                        </Opcao>
                        <Opcao funcao={()=>{ iniciar(userAgents, Mensagem, setMensagem, setExecutando, setMeusLogs, setCriadasSucesso, setNaoCriadas, setDisplayVoltar) }}>
                            <span>Iniciar</span>
                            <img src={iniciarIMG}/>
                        </Opcao>
                    </Rodape>
                </>
            : <>
                <Cabeca voltar={displayVoltar}/>
                <Logs>
                    {meusLogs.map((logs, index)=>(
                        logs === 'Acessando o instagram' || 
                        logs === 'Capturando o código' || 
                        logs === 'Capturando o email' || 
                        logs === 'Preenchendo dados' || 
                        logs === 'Escolhendo a data' || 
                        logs === 'Confirmando o código' || 
                        logs === 'Alterando a foto de perfil' ||
                        logs === 'Alterando a biografia' ||
                        logs === 'Postando fotos no Feed' ||
                        logs === 'Limpando atividade de login' ||
                        logs === 'O robô terminou, pode voltar!' ? 
                        <h1 key={index}>{logs}</h1> : 
                        <p key={index}>{logs}</p>
                    ))}
                </Logs>
                <Rodape>
                    <Opcao cor='#05A660'>
                        <span>Criadas com sucesso</span>
                        {criadasSucesso}
                    </Opcao>
                    <Opcao cor='#E53535'>
                        <span>Não criadas</span>
                        {naoCriadas}
                    </Opcao>
                </Rodape>
            </>
            }
        </>
    )
}

export { Criador }