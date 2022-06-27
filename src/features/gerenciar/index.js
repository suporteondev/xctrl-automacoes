import apagarIMG from './svg/apagar.svg'
import filtrarIMG from './svg/filtrar.svg'
import ativoIMG from './svg/ativo.svg'
import inativoIMG from './svg/inativo.svg'
import novamenteIMG from './svg/tentar-novamente.svg'
import copiarperfisIMG from './svg/copiarperfis.svg'
import transferirIMG from './svg/transferir.svg'
import pesquisarIMG from './svg/pesquisar.svg'

import { useState } from 'react'

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
 
const Gerenciar = ()=>{

    const { perfis, setPerfis } = usePerfis()
    const [ blur, setBlur ] = useState(false)
    const [ displayFiltrar, setDisplayFiltrar ] = useState(false)
    const [ displayCopiar, setDisplayCopiar ] = useState(false)
    const [ displayTransferir, setDisplayTransferir ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)

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
                        <div>
                            <button style={{ backgroundColor: '#E53535'}} onClick={()=>{ 
                                setDisplayFiltrar(false)
                                setBlur(false)
                            }}>Voltar</button>
                            <button corFundo='#E53535' onClick={()=>{
                                filtrarPerfis(setPerfis, setDisplayFiltrar, setBlur)
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
                        <div>
                            <button style={{ backgroundColor: '#E53535'}} onClick={()=>{ 
                                setDisplayTransferir(false)
                                setBlur(false)
                            }}>Voltar</button>
                            <button 
                                corFundo='#E53535'
                                onClick={()=>{ 
                                    transferirPerfis(setPerfis, setDisplayTransferir, setBlur) 
                                }
                            }>Transferir</button> 
                        </div>
                    </div>
                </Filtrar>

                <Filtrar display={displayApagar}>
                    <div className='form'>
                        <label style={{ textAlign: 'center' }}>Tem certeza que deseja apagar todos os perfis selecionados?</label>
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
                                    apagarPerfis(setPerfis, setDisplayApagar, setBlur) 
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
                                <td>Senha</td>
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
                                                <img src={statusIMG}/>
                                            </Opcao>
                                        </td>
                                        <td className='usuario'>{perfil.usuario}</td>
                                        <td className='senha'>{perfil.senha}</td>
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
                <Opcao cor='#236EFF' onClick={()=>{
                    setDisplayFiltrar(true)
                    setBlur(true)
                }}>
                    <span>Filtrar</span>
                    <img src={filtrarIMG}/>
                </Opcao>
                <Opcao cor='#05A660' onClick={()=>{
                    setDisplayCopiar(true)
                    setBlur(true)
                    listarPerfis()
                }}>
                    <span>Copiar</span>
                    <img src={copiarperfisIMG}/>
                </Opcao>
                <Opcao cor='#8257E5' onClick={()=>{
                    setDisplayTransferir(true)
                    setBlur(true)
                }}>
                    <span>Transferir</span>
                    <img src={transferirIMG}/>
                </Opcao>
                <Opcao cor='#E53535' onClick={()=>{
                    setDisplayApagar(true)
                    setBlur(true)
                }}>
                    <span>Apagar</span>
                    <img src={apagarIMG}/>
                </Opcao>
            </Rodape>

        </div>
    )
}

export { Gerenciar }