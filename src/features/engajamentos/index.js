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
import { FaAd, FaCheck, FaYoutube, FaUserPlus } from 'react-icons/fa'
import { MdLibraryAdd, MdLibraryAddCheck, MdOutlineAddCircle } from 'react-icons/md'
import { IoTime, IoCopy } from 'react-icons/io5'
import { HiFilter } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import { IoIosSearch } from 'react-icons/io'
import { selecionarTodos } from './functions/selecionarTodos'
import { useEffect, useState } from 'react'
import { Filtrar } from './components/filtrar'
import { apagarPerfis } from './functions/apagarPerfis'
import { copiarPerfis } from './functions/copiarPerfis'
import { filtrarPerfis } from './functions/filtrarPerfis'
import { filtrarPorUsuario } from './functions/filtrarPorUsuario'
import { useNavigate } from 'react-router-dom'
import { redirecionar } from '../../functions/redirecionar'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { filtrarTodosPerfis } from './functions/filtrarTodosPerfis'
import { selecionarPerfis } from './functions/selecionarPerfis'
import { usePerfisSelecionadosEngajamentos } from '../../providers/perfisSelecionadosEngajamentos'
import { Titulo } from '../../components/cabeca/components/titulo'
import { copiarTotalPerfis } from './functions/copiarTotalPerfis'

const Engajamentos = ()=>{

    const { acessoGerenciador } = useAcessoGerenciador()
    const [ perfisEngajamentos, setPerfisEngajamentos ] = useState([])
    const { perfisSelecionadosEngajamentos, setPerfisSelecionadosEngajamentos } = usePerfisSelecionadosEngajamentos() 
    const [ blur, setBlur ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)
    const [ displayCopiar, setDisplayCopiar ] = useState(false)
    const [ displayFiltrar, setDisplayFiltrar ] = useState(false)
    const [ displaySelecionar, setDisplaySelecionar ] = useState(false)
    const [ displayQuantidade, setDisplayQuantidade ] = useState(false)
    const [ senhaVisivel, setSenhaVisivel ] = useState('password')
    const Router = useNavigate()

    useEffect(async()=>{
        const perfis = await filtrarTodosPerfis()
        setPerfisEngajamentos(perfis)
    }, [])

    return (
        <div>
            <Cabeca blur={blur} voltar='/painel'/>
            <div>
                <Filtrar display={displaySelecionar}>
                    <div className='form'>
                        <label>Selecionar do perfil:</label>
                        <input id='selecionarMinimo' type='number' defaultValue={1}/>
                        <label>Até o perfil:</label>
                        <input id='selecionarMaximo' type='number' defaultValue={10}/>
                        <div>
                            <button onClick={()=>{ 
                                setDisplaySelecionar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                selecionarPerfis()
                                setDisplaySelecionar(false) 
                                setBlur(false)
                            }}>Selecionar</button> 
                        </div>
                    </div>
                </Filtrar>
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
                                    setPerfisEngajamentos,
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
                        <select id='filtro' onChange={()=> {
                            const filtro = document.querySelector('#filtro').value
                            if(
                                filtro == 'qtdPublicacoes' ||
                                filtro == 'qtdSeguidores' ||
                                filtro == 'qtdSeguindo'
                            ){
                                setDisplayQuantidade(true)
                            }else{
                                setDisplayQuantidade(false)
                            }
                        }}>
                            <option value='todos'>Todos os perfis</option>
                            <option value='ativos'>Perfis ativos</option>
                            <option value='inativos'>Perfis inativos</option>
                            <option value='novamente'>Perfis para tentar novamente</option>
                            <option value='qtdSeguindo'>Filtrar por quantidade de seguindo</option>
                        </select>
                        {displayQuantidade == true ? 
                            <>
                                <label>Quantidade</label>
                                <input id='quantidade' type='number' min={1} defaultValue={0}/>  
                                <label>Maior (1), menor (2) ou igual (3)</label>
                                <input id='como' type='number' min={1} defaultValue={1}/>   
                            </>
                            :
                            ''
                        }
                        <div>
                            <button onClick={()=>{ 
                                setDisplayFiltrar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                filtrarPerfis(
                                    setPerfisEngajamentos, 
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
                            <td>#</td>
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
                            {perfisEngajamentos.map((perfil, index)=>(
                                <tr key={index}>
                                    <td>
                                        <input className='checkbox' type='checkbox'/>
                                    </td>
                                    <td>{index + 1}</td>
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
                <Opcao
                    funcao={()=>{
                        copiarTotalPerfis(perfisEngajamentos.length)
                    }}  
                >
                    <span>Total de perfis</span>
                    {perfisEngajamentos.length}
                </Opcao>
                <Opcao
                    funcao={()=>{
                        setDisplaySelecionar(true)
                        setBlur(true)
                    }}
                >
                    <span>Selecionar perfis</span>
                    <MdLibraryAddCheck/>
                    
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
                <Opcao
                    funcao={()=>{
                        const check = document.querySelectorAll('.checkbox')
                        const perfis = []

                        check.forEach((e)=>{
                            if(e.checked == true){
                                
                                const usuario = e.parentElement.parentNode.querySelector('.usuario').innerText
                                
                                // CAPTURANDO A POSIÇÃO DO PERFIL QUE SERÁ ATUALIZADO
                                const indexPerfil = perfisEngajamentos.findIndex(perfil => perfil.usuario === usuario)

                                // ATUALIZANDO O PERFIL  
                                const perfil = perfisEngajamentos[indexPerfil]

                                perfis.push(perfil)
                            }
                        })

                        if(perfis.length > 0){
                            setPerfisSelecionadosEngajamentos(perfis)
                            redirecionar(Router, '/seguidores')
                        }else{
                            window.alert('Selecione ao menos um perfil!')
                        }
                    }}
                >
                    <span>Enviar seguidores</span>
                    <FaUserPlus/>
                </Opcao>
                <Opcao funcao={()=>{}}>
                    <span>Digite um usuário...</span>
                    <input name='usuarioPesquisado' type='text'/>
                </Opcao>
                <Opcao 
                    funcao={()=>{
                        filtrarPorUsuario(setPerfisEngajamentos)
                    }}
                >
                    <span>Pesquisar perfil</span>
                    <IoIosSearch/>
                </Opcao>
            </Rodape>
        </div>
    )
}

export { Engajamentos }