import { useNavigate } from 'react-router-dom'
import { Conteudos } from './components/conteudos'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Opcao } from '../../components/opcao'
import { Titulo } from './components/titulo'
import { Descricao } from './components/descricao'
import { Servicos } from './components/servicos'
import { Servico } from './components/servico'
import { redirecionar } from '../../functions/redirecionar'
import gerenciadorIMG from './svg/gerenciador.svg'
import montadorIMG from './svg/montador.svg'
import criadorIMG from './svg/criador.svg'
import suporteIMG from './svg/suporte.svg'
import tutorialIMG from '../../assets/svg/tutorial.svg'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useUsuarioLogado } from '../../providers/usuarioLogado'
import { useAcessoGerenciador } from '../../providers/acessoGerenciador'
import { useAcessoCriador } from '../../providers/acessoCriador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { MdOutlineMoneyOff } from 'react-icons/md'
import { useState } from 'react'

const Painel = ()=>{

    const { usuarioLogado } = useUsuarioLogado()
    const Router = useNavigate()

    const { acessoGerenciador } = useAcessoGerenciador()
    const { acessoCriador } = useAcessoCriador()
    const { acessoMontador } = useAcessoMontador()
    const [ novaVersao, setNovaVersao ] = useState({
        titulo: '1.0.1',
        descricao: 'Criador, montador, gerenciador (Verificar perfis, filtrar perfis, copiar perfis, apagar perfis.)',
        download: 'https://xctrl.s3.sa-east-1.amazonaws.com/xctrl-1.0.0.zip'
    })

    return (
        <>
            <Cabeca/>
            <Conteudos>
                <Titulo>Olá, {usuarioLogado.nome}!</Titulo>
                <Descricao>Todos os nossos serviços estão aqui.</Descricao>
                <Servicos>
                    <Servico 
                        ativo={acessoCriador.status}
                        onClick={()=>{ 
                            {acessoCriador.status == true ? 
                                redirecionar(Router, '/criador')
                                : 
                                redirecionar(Router, '/comprarcriador')
                            }
                        }}
                    >
                        <div>
                            <img src={criadorIMG}/>
                        </div>
                        <h1>Criador</h1>
                        <p>
                            {acessoCriador.status == true ? 'Ativo': 'Inativo'}
                        </p>
                    </Servico>
                    <Servico 
                        ativo={acessoMontador.status}
                        onClick={()=>{ 
                            {acessoMontador.status == true ? 
                                redirecionar(Router, '/montador')
                                : 
                                redirecionar(Router, '/comprarmontador')
                            }
                        }}
                    >
                        <div>
                            <img src={montadorIMG}/>
                        </div>
                        <h1>Montador</h1>
                        <p>
                            {acessoMontador.status == true ? 'Ativo': 'Inativo'}
                        </p>
                    </Servico>
                    <Servico 
                        ativo={acessoGerenciador.status}
                        onClick={()=>{ 
                            {acessoGerenciador.status == true ? 
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
                            {acessoGerenciador.status == true ? 'Ativo': 'Inativo'}
                        </p>
                    </Servico>
                </Servicos>
            </Conteudos>
            <Rodape>
                <Opcao funcao={()=> { abrirNavegador('https://www.youtube.com/watch?v=32SgZd1zkiE')}}>
                    <span>Manual de uso</span>
                    <FaYoutube/>
                </Opcao>
                <Opcao funcao={()=> abrirNavegador('https://api.whatsapp.com/send?phone=5561995162761&text=Ol%C3%A1,%20tudo%20bem?') }>
                    <span>Suporte da plataforma</span>
                    <FaWhatsapp/>
                </Opcao>
                {window.api.ipcRenderer.sendSync('versaoAplicativo') != window.api.ipcRenderer.sendSync('versaoAtual') ?
                    <a href={'https://xctrl.s3.sa-east-1.amazonaws.com/xctrl-' + window.api.ipcRenderer.sendSync('versaoAtual') + '.zip'} download>
                        <Opcao>
                            <span>Baixar a nova versão - {window.api.ipcRenderer.sendSync('versaoAtual')}</span>
                            <HiDownload/>
                        </Opcao>
                    </a>
                    :
                    ''
                }
                {acessoCriador.status != true && acessoGerenciador.status != true && acessoMontador.status != true ? 
                    <Opcao funcao={()=> redirecionar(Router, '/megapromocao')}>
                        <span>Mega promoção</span>
                        <MdOutlineMoneyOff/>
                    </Opcao>
                    :
                    ''
                }
                V1.0.0
            </Rodape>
        </>
    )
}

export { Painel }