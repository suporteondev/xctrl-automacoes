import { Conteudos } from './components/conteudos'
import { Configuracoes } from './components/configuracoes'
import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Titulo } from './components/titulo'
import { Caixa } from './components/caixa'
import { Etiqueta } from './components/etiqueta'
import { Entrada } from './components/entrada'
import { Opcao } from '../../components/opcao'
import { Select } from './components/select'
import { iniciar } from './functions/iniciar'
import { Mensagem } from './components/mensagem'
import { useState, useEffect } from 'react'
import { salvar } from './functions/salvar'
import { Textarea } from './components/textarea'
import { Logs } from './components/logs'
import { abrirNavegador } from '../../functions/abrirNavegador'
import { useConfiguracoesMontador } from '../../providers/configuracoesMontador'
import { useAcessoMontador } from '../../providers/acessoMontador'
import { userAgentsMobile } from '../../userAgentsMobile'
import { FaYoutube } from 'react-icons/fa'
import { IoIosSave } from 'react-icons/io'
import { IoPlay, IoTime } from 'react-icons/io5'
import { useLocation } from 'react-router-dom'

const LogsMontador = ()=>{

    const [ meusLogs, setMeusLogs ] = useState([])
    const query = new URLSearchParams(useLocation().search)
    const [ fotosPerfisNumero, setFotosPerfisNumero ] = useState(0)
    const [ biografiasAlteradasNumero, setBiografiasAlteradasNumero ] = useState(0)
    const [ publicacoesRealizadasNumero, setPublicacoesRealizadasNumero ] = useState(0)
    const [ publicacoesStoryNumero, setPublicacoesStoryNumero ] = useState(0)
    const [ perfisSeguidosNumero, setPerfisSeguidosNumero ] = useState(0)

    const {
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        seusPerfis,
        generoPerfis,
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLogin,
        esperarEntre
    } = window.api.ipcRenderer.sendSync('configuracoesMontador')

    useEffect(async()=>{

        const abaAtual = query.get('aba')
        const logss = document.querySelector('#logs')
        const arrayPerfis = []
            
        if(modoPerfis == 'linha'){
            seusPerfis.split('\n').forEach((usuario)=>{
                const arrayDados = usuario.split(' ')
                arrayPerfis.push({ 
                    usuario: arrayDados[0], 
                    senha: arrayDados[1] 
                })
            })
        }else if(modoPerfis == 'coluna'){
            const meusPerfis = seusPerfis.split('\n\n')
            meusPerfis.forEach((perfil)=>{
                arrayPerfis.push({
                    usuario: perfil.split('\n')[0],
                    senha: perfil.split('\n')[1]
                })
            })
        }

        var intervalo = setInterval(()=>{ 

            var fotoPerfilAlteradas = 0 
            var biografiasAlteradas = 0 
            var publicacoesRealizadas = 0 
            var publicacoesRealizadasStory = 0 
            var perfisSeguidos = 0 

            window.api.ipcRenderer.sendSync('logMontador')[abaAtual].forEach((mensagem)=>{
                if(mensagem.includes('Foto de perfil alterada com sucesso!') == true){
                    fotoPerfilAlteradas += 1
                }

                if(mensagem.includes('Biografia alterada com sucesso!') == true){
                    biografiasAlteradas += 1
                }

                if(mensagem.includes('Publicação realizada com sucesso!') == true){
                    publicacoesRealizadas += 1
                }

                if(mensagem.includes('Story publicado com sucesso!') == true){
                    publicacoesRealizadasStory += 1
                }

                if(mensagem.includes('Perfil seguido com sucesso!') == true){
                    perfisSeguidos += 1
                }
            })

            setFotosPerfisNumero(fotoPerfilAlteradas)
            setBiografiasAlteradasNumero(biografiasAlteradas)
            setPublicacoesRealizadasNumero(publicacoesRealizadas)
            setPublicacoesStoryNumero(publicacoesRealizadasStory)
            setPerfisSeguidosNumero(perfisSeguidos)

            setMeusLogs(window.api.ipcRenderer.sendSync('logMontador')[abaAtual])
            logss.scrollTop = logss.scrollHeight
            if(window.api.ipcRenderer.sendSync('logMontador')[abaAtual][window.api.ipcRenderer.sendSync('logMontador').length - 1] == 'O robô terminou, pode voltar!'){
                setTimeout(clearInterval(intervalo), 3000)
                logss.scrollTop = logss.scrollHeight
            }
        }, 2000)

        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                navegador,
                verAcontecendo,
                modoAnonimo,
                userAgent,
                seusPerfis: arrayPerfis,
                generoPerfis,
                alterarFotoPerfil,
                alterarBiografia,
                quantidadePublicacoesFeed: Number(quantidadePublicacoesFeed),
                quantidadePublicacoesStory: Number(quantidadePublicacoesStory),
                seguirPerfis,
                limparLogin,
                esperarEntre: Number(esperarEntre) * 1000,
                aba: abaAtual
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/iniciarmontador`, configs)
        const resultado = await api.json()
        
    }, [])

    return (
        <>
            <Cabeca voltar='false'/>
            <Logs>
                {meusLogs.map((logs, index)=>(
                    logs === 'Acessando o instagram' || 
                    logs === 'Alterando o gênero do perfil' ||
                    logs === 'Alterando a biografia' || 
                    logs === 'Alterando a foto de perfil' ||
                    logs === 'Postando fotos no story' ||
                    logs === 'Postando fotos no Feed' ||
                    logs === 'Seguindo perfis verificados' ||
                    logs === 'Limpando atividade de login' ||
                    logs === 'O robô terminou, pode voltar!' ? 
                    <h1 key={index}>{logs}</h1> : 
                    <p key={index} style={{ color: logs.includes('sucesso') ? '#28a745' : '' }}>{logs}</p>
                ))}
            </Logs>
            <Rodape>
                <Opcao>
                    <span>Fotos de perfil alteradas</span>
                    {fotosPerfisNumero}
                </Opcao>
                <Opcao>
                    <span>Biografias alteradas</span>
                    {biografiasAlteradasNumero}
                </Opcao>
                <Opcao>
                    <span>Publicações no Feed</span>
                    {publicacoesRealizadasNumero}
                </Opcao>
                <Opcao>
                    <span>Perfis seguidos</span>
                    {perfisSeguidosNumero}
                </Opcao>
                <Opcao>
                    <span>Publicações no Story</span>
                    {publicacoesStoryNumero}
                </Opcao>
            </Rodape>
        </>
    )
}

export { LogsMontador }