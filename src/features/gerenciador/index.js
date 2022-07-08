import apagarIMG from './svg/apagar.svg'
import filtrarIMG from './svg/filtrar.svg'
import ativoIMG from './svg/ativo.svg'
import inativoIMG from './svg/inativo.svg'
import novamenteIMG from './svg/tentar-novamente.svg'
import copiarperfisIMG from './svg/copiarperfis.svg'
import transferirIMG from './svg/transferir.svg'
import pesquisarIMG from './svg/pesquisar.svg'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import dataIMG from '../../assets/svg/tempo.svg'
import verificadorIMG from './svg/verificador.svg'    
import removedorIMG from './svg/removedor.svg'    
import olhoIMG from './svg/olho.svg'    
import { useState, useEffect } from 'react'
import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Filtrar } from './components/filtrar'
import { Opcao } from './components/opcao'
import { Topo } from './components/topo'
import { Tabela } from './components/tabela'
import { usePerfis } from './hooks/perfis'
import { filtrarPorUsuario } from './functions/filtrarPorUsuario'
import { selecionarTodos } from './functions/selecionarTodos'
import { apagarPerfis } from './functions/apagarPerfis'
import { listarPerfis } from './functions/listarPerfis'
import { copiarPerfis } from './functions/copiarPerfis'
import { filtrarPerfis } from './functions/filtrarPerfis'
import { transferirPerfis } from './functions/transferirPerfis'
import { redirecionar } from '../../functions/redirecionar'
import { useNavigate } from 'react-router-dom'
import { mostrarSenhas } from './functions/mostrarSenhas'
import { Carregando } from '../../components/carregando'
import { dataGerenciador } from './functions/dataGerenciador'
import { abrirNavegador } from '../../functions/abrirNavegador'
 
const Gerenciador = ()=>{

    const { perfis, setPerfis } = usePerfis()
    const [ blur, setBlur ] = useState(false)
    const [ dataAcesso, setDataAcesso ] = useState('Sem acesso')
    const [ displayFiltrarCarregando, setDisplayFiltrarCarregando ] = useState('none')
    const [ displayTransferirCarregando, setDisplayTransferirCarregando ] = useState('none')
    const [ displayApagarCarregando, setDisplayApagarCarregando ] = useState('none')
    const [ displayFiltrar, setDisplayFiltrar ] = useState(false)
    const [ displayCopiar, setDisplayCopiar ] = useState(false)
    const [ displayTransferir, setDisplayTransferir ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)
    const [ senhaVisivel, setSenhaVisivel ] = useState('password')
    const Router = useNavigate()

    useEffect(async()=>{
        await dataGerenciador(setDataAcesso)
    }, [])

    return (
        <div>
            <Cabeca blur={blur} voltar='/painel'/>

            <div>
                <Filtrar display={displayFiltrar}>
                    <div className='form'>
                        <label>Filtros</label>
                        <select id='filtro'>
                            <option value='todos'>Todos os perfis</option>
                            <option value='ativo'>Perfis ativos</option>
                            <option value='inativo'>Perfis inativos</option>
                            <option value='novamente'>Perfis para tentar novamente</option>
                            <option value='0'>Perfis sem publicações</option>
                            <option value='prontas-gni'>Perfis prontos para o GNI</option>
                            <option value='prontas-dizu'>Perfis prontos para o DIZU</option>
                        </select>
                        <Carregando display={displayFiltrarCarregando}/>
                        <div>
                            <button style={{ backgroundColor: '#E53535'}} onClick={()=>{ 
                                setDisplayFiltrar(false)
                                setBlur(false)
                            }}>Voltar</button>
                            <button corFundo='#E53535' onClick={()=>{
                                filtrarPerfis(setPerfis, setDisplayFiltrar, setBlur, setDisplayFiltrarCarregando)
                            }}>Filtrar</button> 
                        </div>
                    </div>
                </Filtrar>

                <Filtrar display={displayCopiar}>
                    <div className='form'>
                        <label>Opções</label>
                        <select id='copiar' onChange={()=>{ listarPerfis() }}>
                            <option value='usuarios'>Listar somente os usuários</option>
                            <option value='linha'>Listar usuários e senhas em modo linha</option>
                            <option value='coluna'>Listar usuários e senhas em modo coluna</option>
                        </select>
                        <label>Perfis listados</label>
                        <textarea id='textarea-perfis'></textarea>
                        <div>
                            <button style={{ backgroundColor: '#E53535'}} onClick={()=>{ 
                                setDisplayCopiar(false)
                                setBlur(false)
                            }}>Voltar</button>
                            <button corFundo='#E53535' onClick={()=> { copiarPerfis() }}>Copiar</button> 
                        </div>
                    </div>
                </Filtrar>

                <Filtrar display={displayTransferir}>
                    <div className='form'>
                        <label>Email de quem irá receber</label>
                        <input name='email' type='email' placeholder='Digite o email...'/>
                        <Carregando display={displayTransferirCarregando}/>
                        <div>
                            <button style={{ backgroundColor: '#E53535'}} onClick={()=>{ 
                                setDisplayTransferir(false)
                                setBlur(false)
                            }}>Voltar</button>
                            <button 
                                corFundo='#E53535'
                                onClick={()=>{ 
                                    transferirPerfis(setPerfis, setDisplayTransferir, setBlur, setDisplayTransferirCarregando) 
                                }
                            }>Transferir</button> 
                        </div>
                    </div>
                </Filtrar>

                <Filtrar display={displayApagar}>
                    <div className='form'>
                        <label>Deseja apagar os perfis selecionados?</label>
                        <Carregando display={displayApagarCarregando}/>
                        <div>
                            <button 
                                style={{ 
                                    backgroundColor: '#E53535'
                                }} 
                                onClick={()=>{ 
                                    setDisplayApagar(false)
                                    setBlur(false)
                                }}
                            >
                                Voltar
                            </button>
                            <button 
                                corFundo='#E53535' 
                                onClick={()=>{ 
                                    apagarPerfis(setPerfis, setDisplayApagar, setBlur, setDisplayApagarCarregando) 
                                }}
                            >
                                Apagar
                            </button> 
                        </div>
                    </div>
                </Filtrar>
            </div>

            <Conteudos blur={blur}>
                <Topo>
                    <h1>Você possui {perfis.length} perfis</h1>
                    <div className='caixaPesquisa'>
                        <input id='usuario' type='text' placeholder='Digite um usuário...'/>
                        <div onClick={()=> { filtrarPorUsuario(setPerfis) }}>
                            <img src={pesquisarIMG}/>
                        </div>
                    </div>
                </Topo>
                <Tabela>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <input 
                                        id='selecionador' 
                                        type='checkbox' 
                                        onClick={()=>{ 
                                            selecionarTodos() 
                                        }}
                                    />
                                </td>
                                <td>Status</td>
                                <td>Usuário</td>
                                <td>
                                    <span>Ver senhas</span>
                                    <img 
                                        src={olhoIMG} 
                                        style={{ width: '20px', marginTop: '5px' }}
                                        onClick={()=> mostrarSenhas(senhaVisivel, setSenhaVisivel)}
                                    />
                                </td>
                                <td>S</td>
                                <td>S</td>
                                <td>P</td>
                            </tr>
                        </thead>
                        <tbody>
                            {perfis.map((perfil, index)=>{

                                let corTexto = null
                                let statusIMG = null
                                let statusMensagem = null

                                if(perfil.status == 'ativo'){
                                    corTexto = '#05A660'
                                    statusIMG = ativoIMG
                                    statusMensagem = 'Perfil ativo'
                                }else if(perfil.status == 'inativo'){
                                    corTexto = '#E53535'
                                    statusIMG = inativoIMG
                                    statusMensagem = 'Perfil inativo'
                                }else if(perfil.status == 'novamente'){
                                    corTexto = 'orange'
                                    statusIMG = novamenteIMG
                                    statusMensagem = 'Tentar novamente'
                                }
                                

                                return (
                                    <tr key={index}>
                                        <td>
                                            <input className='checkbox' type='checkbox'/>
                                        </td>
                                        <td className='status'>
                                            <Opcao corTexto={corTexto} cursor='no-drop' bottom='direita' left='direita'>
                                                <span>{statusMensagem}</span>
                                                <img src={statusIMG} style={{ width: '18px'}}/>
                                            </Opcao>
                                        </td>
                                        <td className='usuario'>{perfil.usuario}</td>
                                        <td className='senha'>
                                            <input type={senhaVisivel} defaultValue={perfil.senha}/>
                                        </td>
                                        <td>{perfil.seguidores}</td>
                                        <td>{perfil.seguindo}</td>
                                        <td>{perfil.publicacoes}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Tabela>
            </Conteudos>

            <Rodape blur={blur}>
                <Opcao>
                    {dataAcesso == 'Sem acesso' ? 
                        ''
                        :
                        <span>
                            {dataAcesso == 'permanente' ? 'Acesso permanente' : 'Seu plano expira dia ' + dataAcesso}
                        </span>
                    }
                    <img src={dataIMG}/>
                </Opcao>
                <Opcao onClick={()=> abrirNavegador('https://www.youtube.com/watch?v=daZ8VyvDyJU')}>
                    <span>Manual de uso</span>
                    <img src={tutorialIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    redirecionar(Router, '/verificador')
                }}>
                    <span>Verificar perfis</span>
                    <img src={verificadorIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    setDisplayFiltrar(true)
                    setBlur(true)
                }}>
                    <span>Filtrar perfis</span>
                    <img src={filtrarIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    setDisplayCopiar(true)
                    setBlur(true)
                    listarPerfis()
                }}>
                    <span>Copiar perfis</span>
                    <img src={copiarperfisIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    setDisplayTransferir(true)
                    setBlur(true)
                }}>
                    <span>Transferir perfis</span>
                    <img src={transferirIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    setDisplayApagar(true)
                    setBlur(true)
                }}>
                    <span>Apagar perfis</span>
                    <img src={apagarIMG}/>
                </Opcao>
                <Opcao onClick={()=>{
                    redirecionar(Router, '/removedor')
                }}>
                    <span>Remover perfis desativados GNI</span>
                    <img src={removedorIMG}/>
                </Opcao>
            </Rodape>
        </div>
    )
}

export { Gerenciador }