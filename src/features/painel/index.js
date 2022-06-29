import { useNavigate } from 'react-router-dom'
import { useNome } from '../../providers/nome'
import { Conteudos } from './components/conteudos'
import { useServicos } from './hooks/servicos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Descricao } from './components/descricao'
import { Servicos } from './components/servicos'
import { Servico } from './components/servico'
import { redirecionar } from '../../functions/redirecionar'

import criadorIMG from './svg/criador.svg'
import configuracoesIMG from './svg/configuracoes.svg'
import comprovantesIMG from './svg/comprovantes.svg'
import comprarIMG from './svg/comprar.svg'
import { Opcao } from '../../components/opcao'

const Painel = ()=>{

    const { servicos } = useServicos()
    const { nome } = useNome()
    const Router = useNavigate()
    
    return (
        <>
            <Cabeca/>
            <Conteudos>
                <Titulo>Olá, {nome}!</Titulo>
                <Descricao>Todos os nossos serviços estão aqui.</Descricao>
                <Servicos>
                    <Servico onClick={()=>{ redirecionar(Router, '/criador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Criador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/montador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Montador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/engajamentos') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Engajamentos</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/gerenciador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Gerenciador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/realizador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Realizador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/removedor') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Removedor</h1>
                        <p>Ativo</p>
                    </Servico>
                </Servicos>
            </Conteudos>
            <Rodape>
                <Opcao 
                    funcao={()=>{ 
                        redirecionar(Router, '/configuracoes') 
                    }}
                >
                    <span>Configurações</span>
                    <img src={configuracoesIMG}/>
                </Opcao>
                <Opcao 
                    funcao={()=>{ 
                        redirecionar(Router, '/comprar') 
                    }}
                >
                    <span>Comprar serviços</span>
                    <img src={comprarIMG}/>
                </Opcao>
                <Opcao 
                    funcao={()=>{ 
                        redirecionar(Router, '/comprovantes') 
                    }}
                >
                    <span>Comprovantes</span>
                    <img src={comprovantesIMG}/>
                </Opcao>
                V1.0.0
            </Rodape>
        </>
    )
}

export { Painel }