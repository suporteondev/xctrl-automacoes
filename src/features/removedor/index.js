import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'

const Removedor = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Removedor de perfis</Titulo>
            </Conteudos>
            <Rodape>V1.0.0</Rodape>
        </>
    )
}

export { Removedor }