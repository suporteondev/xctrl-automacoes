import { useNavigate } from 'react-router-dom'
import { useNome } from '../../providers/nome'
import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Opcao } from '../../components/opcao'
import { Titulo } from './components/titulo'
import { Descricao } from './components/descricao'
import { Servicos } from './components/servicos'
import { Servico } from './components/servico'
import { redirecionar } from '../../functions/redirecionar'
import criadorIMG from './svg/criador.svg'
import comprarIMG from './svg/comprar.svg'

const Painel = ()=>{

    const { nome } = useNome()
    const Router = useNavigate()
    
    return (
        <>
            <Cabeca/>
            <Conteudos>
                <Titulo>Olá, {nome}!</Titulo>
                <Descricao>Todos os nossos serviços estão aqui.</Descricao>
                <Servicos>
                    <Servico onClick={()=>{ redirecionar(Router, '/montador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Montador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/gerenciador') }}>
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Gerenciador</h1>
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
                <Opcao funcao={()=> redirecionar(Router, '/comprar') }>
                    <span>Comprar serviços</span>
                    <img src={comprarIMG}/>
                </Opcao>
                V1.0.0
            </Rodape>
        </>
    )
}

export { Painel }