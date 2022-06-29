import { Conteudos } from './components/conteudos'
import { Configuracoes } from './components/configuracoes'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'

const Criador = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Criador de perfis</Titulo>
                <Configuracoes>
                    <Caixa>
                        <Etiqueta>Caminho do navegador</Etiqueta>
                        <Entrada
                            name='senha' 
                            type='text' 
                            placeholder='Caminho do navegador...'
                        />
                    </Caixa>
                    <Caixa>
                        <Etiqueta>Modo invisível</Etiqueta>
                        <Entrada
                            name='senha' 
                            type='text' 
                            placeholder='Sim'
                        />
                    </Caixa>
                </Configuracoes>
            </Conteudos>
            <Rodape>V1.0.0</Rodape>
        </>
    )
}

export { Criador }