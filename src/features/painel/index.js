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
import verificadorIMG from './svg/verificador.svg'
import gerenciadorIMG from './svg/gerenciador.svg'
import removedorIMG from './svg/removedor.svg'
import comprarIMG from './svg/comprar.svg'
import criadorIMG from './svg/criador.svg'

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
                    <Servico onClick={()=>{ redirecionar(Router, '/verificador') }}>
                        <div>
                            <img src={verificadorIMG}/>
                        </div>
                        <h1>Verificador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/gerenciador') }}>
                        <div>
                            <img src={gerenciadorIMG}/>
                        </div>
                        <h1>Gerenciador</h1>
                        <p>Ativo</p>
                    </Servico>
                    <Servico onClick={()=>{ redirecionar(Router, '/removedor') }}>
                        <div>
                            <img src={removedorIMG}/>
                        </div>
                        <h1>Removedor GNI</h1>
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