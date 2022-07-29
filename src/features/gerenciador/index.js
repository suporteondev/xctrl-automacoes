import { Conteudos } from './components/conteudos'
import { Tabela } from './components/tabela'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Opcao as Opcao2 } from './components/opcao'
import { Opcao } from '../../components/opcao'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { BsExclamationTriangle } from 'react-icons/bs'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { usePerfisGerenciador } from '../../providers/perfisGerenciador'
import { FaYoutube} from 'react-icons/fa'
import { IoTime, IoCopy } from 'react-icons/io5'
import { HiFilter } from 'react-icons/hi'
import { AiFillDelete } from 'react-icons/ai'
import { selecionarTodos } from './functions/selecionarTodos'
import { useEffect, useState } from 'react'
import { Filtrar } from './components/filtrar'
import { apagarPerfis } from './functions/apagarPerfis'

const Gerenciador = ()=>{

    const { acessoGerenciador } = useAcessoGerenciador()
    const perfisGerenciador = window.api.ipcRenderer.sendSync('perfisGerenciador')
    
    const [ blur, setBlur ] = useState(false)
    const [ displayApagar, setDisplayApagar ] = useState(false)

    // useEffect(()=>{
    //     window.api.ipcRenderer.sendSync('setPerfisGerenciador', [])
    // }, [])
 
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
                                    setDisplayApagar,
                                    setBlur
                                )
                            }}>Apagar</button> 
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
                            <td>Senha</td>
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
                                    <td>{perfil.senha}</td>
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
                    <span>Total de perfis</span>
                    {perfisGerenciador.length}
                </Opcao>
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
                    <span>Filtrar perfis</span>
                    <HiFilter/>
                </Opcao>
                <Opcao>
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
            </Rodape>
        </div>
    )
}

export { Gerenciador }