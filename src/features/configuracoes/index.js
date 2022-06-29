import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'

const Configuracoes = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Configurações da plataforma</Titulo>
            </Conteudos>
            <Rodape>V1.0.0</Rodape>
        </>
    )
}

export { Configuracoes }