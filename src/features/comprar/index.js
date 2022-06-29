import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'

const Comprar = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Comprar serviços</Titulo>
            </Conteudos>
            <Rodape>V1.0.0</Rodape>
        </>
    )
}

export { Comprar }