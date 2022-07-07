import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Botao } from './components/botao'
import { Opcao } from '../../components/opcao'
import { gerarPagamento } from './functions/gerarPagamento'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import { Entrada } from './components/entrada'

const Suporte = ()=>{
    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo>Suporte da plataforma</Titulo>
                <Caixa>
                    <Etiqueta>Grupo dos clientes</Etiqueta>
                    <Entrada defaultValue='https://chat.whatsapp.com/FjnHpAUvSeZC2kbdwQsDGc'/>
                </Caixa>
                <Caixa>
                    <Etiqueta>Suporte direto</Etiqueta>
                    <Entrada defaultValue='https://api.whatsapp.com/send?phone=5561991663171&text=Ol%C3%A1,%20tudo%20bem?'/>
                </Caixa>
            </Conteudos>
            <Rodape>
                <Opcao>
                    <span>Manual de uso</span>
                    <img src={tutorialIMG}/>
                </Opcao>
            </Rodape>
        </>
    )
}

export { Suporte }