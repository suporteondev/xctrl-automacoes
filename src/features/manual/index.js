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

const Manual = ()=>{

    const { usuarioLogado } = useUsuarioLogado()
    const Router = useNavigate()

    const { acessoGerenciador } = useAcessoGerenciador()
    const { acessoCriador } = useAcessoCriador()
    const { acessoMontador } = useAcessoMontador()

    return (
        <>
            <Cabeca voltar='/painel'/>
            <Conteudos>
                <Titulo style={{ marginBottom: '20px', marginTop: '15px'}}>Como funciona o painel de controle?</Titulo>
                <iframe width="710" height="420" src="https://www.youtube.com/embed/mNRQC1r9f-Y" title="XCtrl - Como eu uso o painel de controle?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                
                <Titulo style={{ marginBottom: '20px', marginTop: '15px'}}>Como configurar e usar o criador de perfis?</Titulo>
                <iframe width="710" height="420" src="https://www.youtube.com/embed/1PBx9fYbYDM" title="XCtrl - Criador de perfis" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                
                <Titulo style={{ marginBottom: '20px', marginTop: '15px'}}>Como configurar e usar o montador de perfis?</Titulo>
                <iframe width="710" height="420" src="https://www.youtube.com/embed/9_9wkWbyHgM" title="XCtrl - Como eu uso o montador de perfis?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                
                <Titulo style={{ marginBottom: '20px', marginTop: '15px'}}>Como configurar e usar o verificador de perfis?</Titulo>
                <iframe width="710" height="420" src="https://www.youtube.com/embed/ri5_bBMx5gc" title="XCtrl - Como eu uso o verificador de perfis?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <Titulo style={{ marginBottom: '20px', marginTop: '15px'}}>Como usar o gerenciador de perfis?</Titulo>
                <iframe width="710" height="420" src="https://www.youtube.com/embed/Y4rpSQoxJPA" title="XCtrl - Como eu uso o criador de perfis?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

                <div style={{ marginBottom: '20px'}}></div>
            </Conteudos>
            <Rodape>V{window.api.ipcRenderer.sendSync('versaoAplicativo')}</Rodape>
        </>
    )
}

export { Manual }