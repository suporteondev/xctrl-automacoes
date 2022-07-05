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
import { useEffect, useState } from 'react'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { useConfiguracoesCriador } from '../../providers/configuracoesCriador'

const Criador = ()=>{

    const [ mensagem, setMensagem ] = useState(<Mensagem></Mensagem>)
    const [ executando, setExecutando ] = useState(false)
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ meusLogs, setMeusLogs ] = useState([])

    const [ criadasSucesso, setCriadasSucesso ] = useState(0)
    const [ criadasSMS, setCriadasSMS ] = useState(0)
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
                                    <option value='Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36'>1º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 10; SM-G996U Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36'>2º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 10; SM-G980F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.96 Mobile Safari/537.36'>3º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 9; SM-G973U Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'>4º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.84 Mobile Safari/537.36'>5º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 7.0; SM-G892A Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/60.0.3112.107 Mobile Safari/537.36'>6º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 7.0; SM-G930VC Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/58.0.3029.83 Mobile Safari/537.36'>7º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 6.0.1; SM-G935S Build/MMB29K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36'>8º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 6.0.1; SM-G920V Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'>9º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 5.1.1; SM-G928X Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36'>10º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 12; Pixel 6 Build/SD1A.210817.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36'>11º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 11; Pixel 5 Build/RQ3A.210805.001.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.159 Mobile Safari/537.36'>12º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 10; Google Pixel 4 Build/QD1A.190821.014.C2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36'>13º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 Build/OPD1.170811.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36'>14º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 7.1.1; Google Pixel Build/NMF26F; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/54.0.2840.85 Mobile Safari/537.36'>15º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36'>16º User Agent</option>
                                    <option value='Mozilla/5.0 (Linux; Android 6.0.1; E6653 Build/32.2.A.0.253) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.98 Mobile Safari/537.36'>17º User Agent</option>
                                    <option value='Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1'>18º User Agent</option>
                                    <option value='Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1'>19º User Agent</option>
                                    <option value='Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'>20º User Agent</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Provedor de email</Etiqueta>
                                <Select name='provedorEmail' defaultValue={configuracoesCriador.provedorEmail}>
                                    <option value='cryptogmail'>Cryptogmail</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Como salvar</Etiqueta>
                                <Select name='comoSalvar' defaultValue={configuracoesCriador.comoSalvar}>
                                    <option value='linha'>Modo linha - TXT</option>
                                    <option value='coluna'>Modo coluna - TXT</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Onde salvar</Etiqueta>
                                <Entrada name='ondeSalvar' type='text' defaultValue={configuracoesCriador.ondeSalvar}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Quantidade de perfis</Etiqueta>
                                <Entrada name='quantidadePerfis' type='number' defaultValue={configuracoesCriador.quantidadePerfis}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Gênero dos perfis</Etiqueta>
                                <Select name='generoPerfis' defaultValue={configuracoesCriador.generoPerfis}>
                                    <option value='feminino'>Feminino</option>
                                    <option value='masculino'>Masculino</option>
                                </Select>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Esperar entre as criações (Segundos)</Etiqueta>
                                <Entrada name='esperarSegundos' type='number' defaultValue={configuracoesCriador.esperarSegundos}/>
                            </Caixa>
                            <Caixa>
                                <Etiqueta>Senha dos perfis</Etiqueta>
                                <Entrada name='senhaPerfis' type='text' defaultValue={configuracoesCriador.senhaPerfis}/>
                            </Caixa>
                            {mensagem}
                        </Configuracoes>
                    </Conteudos>
                    <Rodape>
                        <Opcao>
                            <span>Encerra dia 29/06/2022</span>
                            <img src={tempoIMG}/>
                        </Opcao>
                        <Opcao>
                            <span>Manual de uso</span>
                            <img src={tutorialIMG}/>
                        </Opcao>
                        <Opcao funcao={()=>{ salvar(Mensagem, setMensagem, setConfiguracoesCriador) }}>
                            <span>Salvar configurações</span>
                            <img src={salvarIMG}/>
                        </Opcao>
                        <Opcao funcao={()=>{ iniciar(Mensagem, setMensagem, setExecutando, setMeusLogs, setCriadasSucesso, setCriadasSMS, setNaoCriadas, setDisplayVoltar) }}>
                            <span>Iniciar</span>
                            <img src={iniciarIMG}/>
                        </Opcao>
                    </Rodape>
                </>
            : <>
                <Cabeca voltar={displayVoltar}/>
                <Logs>
                    {meusLogs.map((logs, index)=>(
                        logs === 'Capturando o email' || 
                        logs === 'Preenchendo dados' || 
                        logs === 'Escolhendo a data' ||
                        logs === 'Capturando o código' ||
                        logs === 'Confirmando o código' ||
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
                    <Opcao cor='#FFA500'>
                        <span>Criadas com SMS</span>
                        {criadasSMS}
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