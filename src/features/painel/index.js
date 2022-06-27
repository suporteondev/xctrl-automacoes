import { useNavigate } from 'react-router-dom'
import { useNome } from '../../providers/nome'
import { Conteudos } from './components/conteudos'
import { Titulo } from './components/titulo'
import { Cartas } from './components/cartas'
import { Carta } from './components/carta'
import { Descricao } from './components/descricao'
import { Botao } from './components/botao'
import { Caixa } from './components/caixa'
import { Valor } from './components/valor'
import { useServicos } from './hooks/servicos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import verificarIMG from './svg/verificar-perfis.svg'
import gerenciarIMG from './svg/gerenciar-perfis.svg'
import removerperfisIMG from './svg/remover-perfis.svg'
import salvarIMG from './svg/salvar.svg'
import informacoesIMG from './svg/navegador.svg'
import criarperfisIMG from './svg/criar-perfis.svg'
import montarperfisIMG from './svg/montar-perfis.svg'
import criarmontarperfisIMG from './svg/criar-montar-perfis.svg'
import removedorPerfisGniIMG from './svg/removedor-perfis-gni.svg'
import removedorPerfisDizuIMG from './svg/removedor-perfis-dizu.svg'
import { redirecionar } from '../../functions/redirecionar'
import { Entrada } from './components/entrada'
import { useCaminhoNavegador } from '../../providers/caminhoNavegador'

const Painel = ()=>{

    const { servicos } = useServicos()
    const { caminhoNavegador, setCaminhoNavegador } = useCaminhoNavegador()
    const { nome } = useNome()
    const Router = useNavigate()
    
    return (
        <Conteudos>
            <Cabeca/>
            <Titulo>Bem vindo, {nome}!</Titulo>
            <Descricao textAlign='center'>Qual dos serviços abaixo você deseja usar?</Descricao>
            <Cartas>
                <div style={{ width: '100%', display: 'flex', aligmItens: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                    <div className='informacoes'>
                        <img style={{ width: '20px' }} src={informacoesIMG}/>
                        <p>Crie um atalho do navegador que deseja automatizar na sua área de trabalho, aperte com o botão direito do mouse em cima dele, aperte em propriedades, copie o destino, retire as aspas e cole no campo de texto acima.</p>
                    </div>
                    <Entrada name='caminho-navegador' type='text' defaultValue={caminhoNavegador} placeholder='Caminho do navegador...'/>
                    <div className='salvar' onClick={() => {
                        const caminhoDoNavegador = document.querySelector('input[name="caminho-navegador"]').value
                        setCaminhoNavegador(caminhoDoNavegador)
                        window.api.ipcRenderer.sendSync('setCaminhoNavegador', caminhoDoNavegador)
                    }}>
                        <img style={{ width: '20px' }} src={salvarIMG}/>
                    </div>
                </div>
                {/* <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={criarperfisIMG}/>
                    </div>
                    <button onClick={()=>{ redirecionar(Router, '/verificar')}} style={{ backgroundColor: '#236EFF' }}>Criar perfis</button>   
                </Carta>
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={montarperfisIMG}/>
                    </div>
                    <button onClick={()=>{ redirecionar(Router, '/verificar')}} style={{ backgroundColor: '#236EFF' }}>Montar perfis</button>   
                </Carta>
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={criarmontarperfisIMG}/>
                    </div>
                    <button onClick={()=>{ redirecionar(Router, '/verificar')}} style={{ backgroundColor: '#236EFF' }}>Criar e montar perfis</button>   
                </Carta> */}
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={verificarIMG}/>
                    </div>
                    <button onClick={()=>{ 
                        window.api.ipcRenderer.sendSync('caminhoNavegador') == '' ?
                        window.alert('Configure o caminho do navegador!') :
                        redirecionar(Router, '/verificar')     
                    }} style={{ backgroundColor: '#236EFF' }}>Verificar perfis</button>   
                </Carta>
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={gerenciarIMG}/>
                    </div>
                    <button onClick={()=>{ 
                        window.api.ipcRenderer.sendSync('caminhoNavegador') == '' ?
                        window.alert('Configure o caminho do navegador!') :
                        redirecionar(Router, '/gerenciar')
                    }} style={{ backgroundColor: '#236EFF' }}>Gerenciar perfis</button>   
                </Carta>
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={removedorPerfisGniIMG}/>
                    </div>
                    <button onClick={()=>{ 
                        window.api.ipcRenderer.sendSync('caminhoNavegador') == '' ?
                        window.alert('Configure o caminho do navegador!') :
                        redirecionar(Router, '/removerperfisgni')
                    }} style={{ backgroundColor: '#236EFF' }}>Remover perfis GNI</button>   
                </Carta>
                <Carta>
                    <div>
                        <span style={{ color: '#236EFF' }}>?</span>
                        <img src={removedorPerfisDizuIMG}/>
                    </div>
                    <button onClick={()=>{ 
                        window.api.ipcRenderer.sendSync('caminhoNavegador') == '' ?
                        window.alert('Configure o caminho do navegador!') :
                        redirecionar(Router, '/removerperfisdizu')
                    }} style={{ backgroundColor: '#236EFF' }}>Remover perfis DIZU</button>   
                </Carta>
            </Cartas>
            <Rodape>Serviços</Rodape>
        </Conteudos>
    )
}

export { Painel }