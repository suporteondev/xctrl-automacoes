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
import suporteIMG from './svg/suporte.svg'
import { useEffect, useState } from 'react'
import { acessoGerenciador } from './functions/acessoGerenciador'

const Painel = ()=>{

    const { nome } = useNome()
    const Router = useNavigate()
    const [ meuAcessoGerenciador, setMeuAcessoGerenciador ] = useState(false)

    useEffect(async()=>{
        await acessoGerenciador(setMeuAcessoGerenciador)
    }, [])

    return (
        <>
            <Cabeca/>
            <Conteudos>
                <Titulo>Olá, {nome}!</Titulo>
                <Descricao>Todos os nossos serviços estão aqui.</Descricao>
                <Servicos>
                    <Servico 
                        ativo={meuAcessoGerenciador}
                        onClick={()=>{ 
                            {meuAcessoGerenciador == true ? 
                                redirecionar(Router, '/gerenciador')
                                : 
                                redirecionar(Router, '/comprar')
                            }
                        }}
                    >
                        <div>
                            <img src={gerenciadorIMG}/>
                        </div>
                        <h1>Gerenciador</h1>
                        <p>
                            {meuAcessoGerenciador == true ? 'Ativo': 'Inativo'}
                        </p>
                    </Servico>
                </Servicos>
            </Conteudos>
            <Rodape>
                <Opcao funcao={()=> redirecionar(Router, '/suporte') }>
                    <span>Suporte da plataforma</span>
                    <img src={suporteIMG}/>
                </Opcao>
                V1.0.0
            </Rodape>
        </>
    )
}

export { Painel }