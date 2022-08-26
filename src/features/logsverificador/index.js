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

const LogsVerificador = ()=>{

    const [ meusLogs, setMeusLogs ] = useState([])
    const query = new URLSearchParams(useLocation().search)
    const [ ativos, setAtivos ] = useState(0)
    const [ inativos, setInativos ] = useState(0)
    const [ novamentes, setNovamentes ] = useState(0)
    const [ averificar, setAverificar ] = useState(0)

    const {
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        seusPerfis,
        limparLogin,
        esperarEntre
    } = window.api.ipcRenderer.sendSync('configuracoesVerificador')

    useEffect(async()=>{

        const abaAtual = query.get('aba')
        const logs = document.querySelector('#logs')
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

        window.api.ipcRenderer.sendSync('tamanho-pequeno')

        var intervalo = setInterval(()=>{

            var perfisAtivos = 0 
            var perfisInativos = 0 
            var perfisNovamente = 0 

            window.api.ipcRenderer.sendSync('logVerificador')[abaAtual].forEach((mensagem)=>{
                if(mensagem.includes('Perfil ativo') == true){
                    perfisAtivos += 1
                }

                if(mensagem.includes('Tentar novamente') == true){
                    perfisNovamente += 1
                }

                if(mensagem.includes('Perfil inativo') == true){
                    perfisInativos += 1
                }
            })

            setAtivos(perfisAtivos)
            setInativos(perfisInativos)
            setNovamentes(perfisNovamente)
            setAverificar(arrayPerfis.length - (perfisAtivos + perfisInativos + perfisNovamente))
            
            setMeusLogs(window.api.ipcRenderer.sendSync('logVerificador')[abaAtual])
            logs.scrollTop = logs.scrollHeight

            if(window.api.ipcRenderer.sendSync('logVerificador')[abaAtual][window.api.ipcRenderer.sendSync('logVerificador').length - 1] == 'O robô terminou, pode voltar!'){
                setTimeout(clearInterval(intervalo), 3000)
                logs.scrollTop = logs.scrollHeight
            }

        }, 1000)

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
                limparLogin,
                esperarEntre: Number(esperarEntre) * 1000,
                aba: abaAtual
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/iniciarverificador`, configs)
        const resultado = await api.json()
        
    }, [])

    return (
        <>
            <Cabeca voltar='false'/>
            <Logs>
                {meusLogs.map((logs, index)=>(
                    logs === 'Acessando o instagram' || 
                    logs === 'Verificando o perfil' || 
                    logs === 'Limpando atividade de login' ||
                    logs === 'O robô terminou, pode voltar!' ? 
                    <h1 key={index}>{logs}</h1> : 
                    <p key={index}>{logs}</p>
                ))}
            </Logs>
            <Rodape>
                <Opcao cor='#236EFF'>
                    <span>Não verificados</span>
                    {averificar}
                </Opcao>
                <Opcao cor='#05A660'>
                    <span>Perfis ativos</span>
                    {ativos}
                </Opcao>
                <Opcao cor='#FFA500'>
                    <span>Tentar novamente</span>
                    {novamentes}
                </Opcao>
                <Opcao cor='#E53535'>
                    <span>Perfis inativos</span>
                    {inativos}
                </Opcao>
            </Rodape>
        </>
    )
}

export { LogsVerificador }