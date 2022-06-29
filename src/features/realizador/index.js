import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'

const Realizador = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Realizador de ações</Titulo>
            </Conteudos>
            <Rodape>V1.0.0</Rodape>
        </>
    )
}

export { Realizador }