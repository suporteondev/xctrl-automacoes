import { useEffect, useState } from 'react'
import { Cabeca } from '../../components/cabeca'
import { Conteudos } from './components/conteudos'
import { Rodape } from '../../components/rodape/index'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Botao } from './components/botao'
import { Selecionar } from './components/selecionar'
import { Botoes } from './components/botoes'
import { AreaTexto } from './components/areaTexto'
import { removerPerfisGni } from './functions/removerPerfisGni'
import { Mensagem } from './components/mensagem'
import { Logs } from './components/logs'
import { Servico } from './components/servico'
import { Topo } from './components/topo'

const RemoverPerfisGni = ()=>{

    useEffect(()=>{ window.api.ipcRenderer.sendSync('tamanho-medio') }, [])
    const [ displayVoltar, setDisplayVoltar ] = useState('false')
    const [ mensagem, setMensagem ] = useState('')
    const [ meusLogs, setMeusLogs ] = useState([])
    const [ removendoPerfisGni, setRemovendoPerfisGni ] = useState(false)
    const [ removidos, setRemovidos ] = useState(0)
    const [ saldoPerdido, setSaldoPerdido ] = useState(0)

    return (
        removendoPerfisGni === false ?
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Topo>
                    <Titulo>Remover perfis GNI</Titulo>
                    <p>
                        ?
                        <span className='descricao'>Para otimizar a verificação dos seus perfis, recomendamos que deixe o tempo entre as verificações de 0 segundos e o navegador no modo invisível.</span>
                    </p>
                </Topo>
                <Caixa>
                    <Etiqueta>User Agent</Etiqueta>
                    <Selecionar name='user-agent'>
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
                    </Selecionar>
                </Caixa>
                <Caixa>
                    <Etiqueta>Modo invisível</Etiqueta>
                    <Selecionar name='visivel'>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Selecionar>
                </Caixa>
                <Caixa>
                    <Etiqueta>Modo anônimo</Etiqueta>
                    <Selecionar name='anonimo'>
                        <option value='sim'>Sim</option>
                        <option value='nao'>Não</option>
                    </Selecionar>
                </Caixa>
                <Caixa>
                    <Etiqueta>Tipo de ação</Etiqueta>
                    <Selecionar name='acao'>
                        <option value='ver'>Ver perfis desativados e o saldo a ser perdido</option>
                        <option value='remover'>Remover perfis desativados</option>
                    </Selecionar>
                </Caixa>
                <Caixa>
                    <Etiqueta>Email do GNI</Etiqueta>
                    <Entrada name='email' type='email' placeholder='Digite seu email...'/>
                </Caixa>
                <Caixa>
                    <Etiqueta>Senha do GNI</Etiqueta>
                    <Entrada name='senha' type='password' placeholder='Digite sua senha...'/>
                </Caixa>
                <Mensagem>{mensagem}</Mensagem>
                <Botoes>
                    <Botao cor='verde'>Salvar configuração</Botao>
                    <Botao onClick={
                        ()=> removerPerfisGni(
                            setMensagem, 
                            setRemovendoPerfisGni, 
                            setMeusLogs,
                            setRemovidos,
                            setSaldoPerdido,
                            setDisplayVoltar
                        )
                    }>Iniciar verificação</Botao>
                </Botoes>
            </Conteudos>
            <Rodape>Serviços > Remover perfis GNI</Rodape>
        </> 
            :
        <>
            <Cabeca voltar={displayVoltar}/>
            <Logs>
                {meusLogs.map((logs, index)=>(
                    logs === 'Acessando o GNI' || 
                    logs === 'Removendo perfil GNI' ||
                    logs === 'Capturando informações' ||
                    logs === 'O robô terminou, pode voltar!' ? 
                    <h1 key={index}>{logs}</h1> : 
                    <p key={index}>{logs}</p>
                ))}
            </Logs>
            <Rodape>
                <Servico fundoCor='#E53535'>
                    {removidos}
                    <span className='descricao'>Perfis</span>
                </Servico>
                <Servico fundoCor='orange'>
                    {saldoPerdido}
                    <span className='descricao'>Saldo</span>
                </Servico>
            </Rodape>
        </>
    )
}

export { RemoverPerfisGni }