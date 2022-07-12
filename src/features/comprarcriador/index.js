import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Select } from './components/select'
import { Botao } from './components/botao'
import { Opcao } from '../../components/opcao'
import { gerarPagamento } from './functions/gerarPagamento'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import qrcodeIMG from './svg/qrcode.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Entrada } from './components/entrada'
import { redirecionar } from '../../functions/redirecionar'
import { Descricao } from './components/descricao'

const ComprarCriador = ()=>{

    const [ pagamentoGerado, setPagamentoGerado ] = useState(false)
    const [ pixQrCode, setPixQrCode ] = useState('')
    const [ pixCopiaCola, setPixCopiaCola ] = useState('')
    const Router = useNavigate()

    return (
        <>
            <Cabeca voltar='/painel'/>
            {pagamentoGerado == false ?
                <Conteudos>
                    <Titulo>Comprar criador de perfis</Titulo>
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
            <Rodape>V1.0.0
            </Rodape>
        </>
    )
}

export { ComprarCriador }