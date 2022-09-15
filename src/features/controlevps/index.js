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
import { FaCheck, FaCheckCircle, FaCheckSquare, FaYoutube } from 'react-icons/fa'
import { MdLibraryAddCheck, MdLibraryAdd } from 'react-icons/md'
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
import { transferirPerfis } from './functions/transferirPerfis'
import { BiTransferAlt } from 'react-icons/bi'
import { adicionarVps } from './functions/adicionarVps'
import { listarVps } from './functions/listarVps'

const ControleVps = ()=>{

    const { acessoGerenciador } = useAcessoGerenciador()
    const [ perfisGerenciador, setPerfisGerenciador ] = useState([])
    const [ blur, setBlur ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)
    const [ displayAdicionar, setDisplayAdicionar ] = useState(false)

    useEffect(async()=>{
        const perfisEncontrados = await listarVps()
        setPerfisGerenciador(perfisEncontrados)
    }, [])

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
                <Filtrar display={displayAdicionar}>
                    <div className='form'>
                        <label>Nome da VPS</label>
                        <input type='text' id='nome-vps'/>
                        <div>
                            <button onClick={()=>{ 
                                setDisplayAdicionar(false) 
                                setBlur(false)
                            }}>Voltar</button>
                            <button onClick={()=>{
                                adicionarVps(setPerfisGerenciador)
                                setDisplayAdicionar(false) 
                                setBlur(false)
                            }}>Adicionar</button> 
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
                            <td>Nome VPS</td>
                            <td>Data</td>
                        </thead>
                        <tbody>
                            {perfisGerenciador.map((perfil, index)=>(
                                <tr key={index}>
                                    <td>
                                        <input className='checkbox' type='checkbox'/>
                                    </td>
                                    <td>{index + 1}</td>
                                    <td className='nome'>{perfil.nome}</td>
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
                    <span>Total de VPS</span>
                    {perfisGerenciador.length}
                </Opcao>
                <Opcao
                    funcao={()=>{
                        setDisplayAdicionar(true) 
                        setBlur(true)
                    }}
                >
                    <span>Adicionar VPS</span>
                    <MdLibraryAdd/>
                </Opcao>
                <Opcao
                    funcao={()=>{
                        setDisplayApagar(true) 
                        setBlur(true)
                    }}
                >
                    <span>Apagar VPS</span>
                    <AiFillDelete/>
                </Opcao>
            </Rodape>
        </div>
    )
}

export { ControleVps }