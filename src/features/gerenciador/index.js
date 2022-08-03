import { Conteudos } from './components/conteudos'
import { Tabela } from './components/tabela'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Opcao as Opcao2 } from './components/opcao'
import { Opcao } from '../../components/opcao'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { BsExclamationTriangle } from 'react-icons/bs'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { listarPerfis } from './functions/listarPerfis'
import { FaCheck, FaYoutube} from 'react-icons/fa'
import { IoTime, IoCopy } from 'react-icons/io5'
import { HiFilter } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import { IoIosSearch } from 'react-icons/io'
import { selecionarTodos } from './functions/selecionarTodos'
import { useState } from 'react'
import { Filtrar } from './components/filtrar'
import { apagarPerfis } from './functions/apagarPerfis'
import { copiarPerfis } from './functions/copiarPerfis'
import { filtrarPerfis } from './functions/filtrarPerfis'
import { filtrarPorUsuario } from './functions/filtrarPorUsuario'
import { useNavigate } from 'react-router-dom'
import { redirecionar } from '../../functions/redirecionar'

const Gerenciador = ()=>{

    const { acessoGerenciador } = useAcessoGerenciador()
    const perfisGerenciador2 = window.api.ipcRenderer.sendSync('perfisGerenciador')
    const [ perfisGerenciador, setPerfisGerenciador ] = useState(perfisGerenciador2)
    const [ blur, setBlur ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)
    const [ displayCopiar, setDisplayCopiar ] = useState(false)
    const [ displayFiltrar, setDisplayFiltrar ] = useState(false)
    const [ senhaVisivel, setSenhaVisivel ] = useState('password')
    const Router = useNavigate()

    return (
        <div>
            <Cabeca blur={blur} voltar='/painel'/>
            <div>
                <Filtrar display={displayApagar}>
                    <div className='form'>
                        <label>Deseja apagar os perfis selecionados?</label>
                        <div>
                            <button onClick={()=>{ 
                                setDisplayApagar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                apagarPerfis(
                                    setPerfisGerenciador,
                                    setDisplayApagar,
                                    setBlur
                                )
                            }}>Apagar</button> 
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
                            <button onClick={()=>{ 
                                setDisplayCopiar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                copiarPerfis()
                            }}>Copiar</button> 
                        </div>
                    </div>
                </Filtrar>
                <Filtrar display={displayFiltrar}>
                    <div className='form'>
                        <label>Filtros</label>
                        <select id='filtro'>
                            <option value='todos'>Todos os perfis</option>
                            <option value='ativos'>Perfis ativos</option>
                            <option value='inativos'>Perfis inativos</option>
                            <option value='novamente'>Perfis para tentar novamente</option>
                            <option value='menos10Publicacoes'>Perfis com menos de 10 publicações</option>
                            <option value='mais10Publicacoes'>Perfis com mais de 10 publicações</option>
                            <option value='menos30Seguidores'>Perfis com menos de 30 seguidores</option>
                            <option value='mais30Seguidores'>Perfis com mais de 30 seguidores</option>
                            <option value='mais20Seguindo'>Perfis que seguem mais que 20</option>
                            <option value='menos20Seguindo'>Perfis que seguem menos que 20</option>
                        </select>
                        <div>
                            <button onClick={()=>{ 
                                setDisplayFiltrar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                filtrarPerfis(
                                    setPerfisGerenciador, 
                                    setDisplayFiltrar, 
                                    setBlur
                                )
                            }}>Filtrar</button> 
                        </div>
                    </div>
                </Filtrar>
            </div>
            <Conteudos blur={blur}>
                <Tabela>
                    <table>
                        <thead>
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
                            <td onClick={()=>{
                                setSenhaVisivel(senhaVisivel === 'password' ? 'text' : 'password')
                            }}>
                                <Opcao2>
                                    <span>Clique para ver as senhas</span>
                                    Senha
                                </Opcao2>
                            </td>
                            <td>
                                <Opcao2>
                                    <span>Publicações</span>
                                    P
                                </Opcao2>
                            </td>
                            <td>
                                <Opcao2>
                                    <span>Seguidores</span>
                                    S
                                </Opcao2>
                            </td>
                            <td>
                                <Opcao2>
                                    <span>Seguindo</span>
                                    S
                                </Opcao2>
                            </td>
                            <td>Data</td>
                        </thead>
                        <tbody>
                            {perfisGerenciador.map((perfil, index)=>(
                                <tr key={index}>
                                    <td>
                                        <input className='checkbox' type='checkbox'/>
                                    </td>
                                    <td>
                                        {perfil.status == 'Ativo' ? 
                                            <Opcao2 bottom='direita' left='direita' status='#236EFF'>
                                                <span>Perfil ativo</span>
                                                <AiFillLike/>
                                            </Opcao2>
                                        : ''}
                                        {perfil.status == 'Inativo' ? 
                                            <Opcao2 bottom='direita' left='direita' status='#dc3545'>
                                                <span>Perfil inativo</span>
                                                <AiFillDislike/>
                                            </Opcao2> 
                                        : ''}
                                        {perfil.status == 'Tentar novamente' ? 
                                            <Opcao2 bottom='direita' left='direita' status='#ffc107'>
                                                <span>Tentar novamente</span>
                                                <BsExclamationTriangle/>
                                            </Opcao2> 
                                        : ''}
                                    </td>
                                    <td className='usuario'>{perfil.usuario}</td>
                                    <td className='senha'>
                                        <input type={senhaVisivel} defaultValue={perfil.senha}/>
                                    </td>
                                    <td>{perfil.publicacoes}</td>
                                    <td>{perfil.seguidores}</td>
                                    <td>{perfil.seguindo}</td>
                                    <td>{perfil.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Tabela>
            </Conteudos>
            <Rodape blur={blur}>
                <Opcao>
                    {acessoGerenciador.data == 'Sem acesso' ? 
                        ''
                        :
                        <span>
                            {
                                acessoGerenciador.data == 'permanente' ? 
                                'Acesso permanente' : 
                                'Seu plano expira dia ' + acessoGerenciador.data
                            }
                        </span>
                    }
                    <IoTime/>
                </Opcao>
                <Opcao>
                    <span>Manual de uso</span>
                    <FaYoutube/>
                </Opcao>
                <Opcao>
                    <span>Total de perfis</span>
                    {perfisGerenciador.length}
                </Opcao>
                <Opcao
                    funcao={()=>{
                        redirecionar(Router, '/verificador')
                    }}
                >
                    <span>Verificar perfis</span>
                    <FaCheck/>
                </Opcao>
                <Opcao 
                    funcao={()=>{
                        setDisplayFiltrar(true)
                        setBlur(true)
                    }}
                >
                    <span>Filtrar perfis</span>
                    <HiFilter/>
                </Opcao>
                <Opcao 
                    funcao={()=>{
                        setDisplayCopiar(true) 
                        setBlur(true)
                        listarPerfis()
                    }}
                >
                    <span>Copiar perfis</span>
                    <IoCopy/>
                </Opcao>
                <Opcao
                    funcao={()=>{
                        setDisplayApagar(true) 
                        setBlur(true)
                    }}
                >
                    <span>Apagar perfis</span>
                    <AiFillDelete/>
                </Opcao>
                <Opcao funcao={()=>{}}>
                    <span>Digite um usuário...</span>
                    <input name='usuarioPesquisado' type='text'/>
                </Opcao>
                <Opcao 
                    funcao={()=>{
                        filtrarPorUsuario(setPerfisGerenciador)
                    }}
                >
                    <span>Pesquisar perfil</span>
                    <IoIosSearch/>
                </Opcao>
            </Rodape>
        </div>
    )
}

export { Gerenciador }