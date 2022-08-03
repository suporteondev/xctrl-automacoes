import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Botao } from './components/botao'
import { gerarPagamento } from './functions/gerarPagamento'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Entrada } from './components/entrada'
import { redirecionar } from '../../functions/redirecionar'
import { Descricao } from './components/descricao'
import { Opcao } from '../../components/opcao'
import { FaYoutube } from 'react-icons/fa'
import { abrirNavegador } from '../../functions/abrirNavegador'

const Comprar = ()=>{

    const [ pagamentoGerado, setPagamentoGerado ] = useState(false)
    const [ pixQrCode, setPixQrCode ] = useState('')
    const [ pixCopiaCola, setPixCopiaCola ] = useState('')
    const Router = useNavigate()

    return (
        <>
            <Cabeca voltar='/painel'/>
            {pagamentoGerado == false ?
                <Conteudos>
                    <Titulo>Comprar gerenciador de perfis</Titulo>
                    <Descricao>Por apenas 20 reais por mês</Descricao>
                    <Botao onClick={()=> gerarPagamento(setPagamentoGerado, setPixQrCode, setPixCopiaCola)}>Gerar pagamento</Botao>
                </Conteudos>
                :
                <Conteudos>
                    <Titulo>Finalizar compra</Titulo>
                    <Caixa>
                        <Etiqueta>PIX Copia e cola</Etiqueta>
                        <Entrada type='text' defaultValue={pixCopiaCola}/>
                    </Caixa>
                    <Caixa>
                        <Etiqueta>PIX QR Code</Etiqueta>
                        <img src={pixQrCode}/>
                    </Caixa>
                    <Botao onClick={()=> redirecionar(Router, '/painel')}>Já paguei e quero usar</Botao>
                </Conteudos>
            }
            <Rodape>
                <Opcao funcao={()=> { abrirNavegador('https://www.youtube.com/watch?v=cEaMcyr3cdI')}}>
                    <span>Manual de uso</span>
                    <FaYoutube/>
                </Opcao>
            </Rodape>
        </>
    )
}

export { Comprar }