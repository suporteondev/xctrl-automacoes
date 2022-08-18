import { Cabeca } from '../../components/cabeca'
import { Rodape } from '../../components/rodape'
import { Opcao } from '../../components/opcao'
import { useState, useEffect } from 'react'
import { Logs } from './components/logs'
import { RiAlertFill } from 'react-icons/ri'
import { useLocation } from 'react-router-dom'

const LogsCriador = ()=>{

    const [ meusLogs, setMeusLogs ] = useState([])
    const query = new URLSearchParams(useLocation().search)
    const [ criadasSucesso, setCriadasSucesso ] = useState(0)
    const [ naoCriadas, setNaoCriadas ] = useState(0)
    const [ fotosPerfisNumero, setFotosPerfisNumero ] = useState(0)
    const [ biografiasAlteradasNumero, setBiografiasAlteradasNumero ] = useState(0)
    const [ publicacoesRealizadasNumero, setPublicacoesRealizadasNumero ] = useState(0)
    const [ publicacoesStoryNumero, setPublicacoesStoryNumero ] = useState(0)
    const [ perfisSeguidosNumero, setPerfisSeguidosNumero ] = useState(0)
    const [ montarPerfisCriados, setMontarPerfisCriados ] = useState(false)
    const [ montadorEmExecucao, setMontadorEmExecucao ] = useState(false)

    const {
        navegador,
        verAcontecendo,
        navegadorAnonimo,
        userAgent,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        esperarEntre,
        limparPastaPrefetch,
        limparPastaTemp,
        montarPerfis
    } = window.api.ipcRenderer.sendSync('configuracoesCriador')

    useEffect(async()=>{

        let abaAtual = query.get('aba')
        let logss = document.querySelector('#logs')

        var intervalo = setInterval(()=>{

            var criadasComSucesso = 0
            var naoCriadas = 0 
            var fotoPerfilAlteradas = 0 
            var biografiasAlteradas = 0 
            var publicacoesRealizadas = 0 
            var publicacoesRealizadasStory = 0 
            var perfisSeguidos = 0 
            var montadorEmExecucaoValor = false

            window.api.ipcRenderer.sendSync('logCriador')[abaAtual].forEach((mensagem)=>{
                if(mensagem.includes('Perfil criado com sucesso!') == true){
                    criadasComSucesso += 1
                }

                if(
                    mensagem.includes('Erro ao tentar criar o perfil.') == true ||
                    mensagem.includes('Erro ao tentar preencher os dados.') == true ||
                    mensagem.includes('Erro ao tentar selecionar a data.') == true ||
                    mensagem.includes('Erro ao tentar capturar o código.') == true ||
                    mensagem.includes('Erro ao tentar capturar o email.') == true
                ){
                    naoCriadas += 1
                }

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

                if(mensagem.includes('Montador em execução') == true){
                    montadorEmExecucaoValor = true
                }
            })

            setMontadorEmExecucao(montadorEmExecucaoValor)
            setCriadasSucesso(criadasComSucesso)
            setNaoCriadas(naoCriadas)
            setFotosPerfisNumero(fotoPerfilAlteradas)
            setBiografiasAlteradasNumero(biografiasAlteradas)
            setPublicacoesRealizadasNumero(publicacoesRealizadas)
            setPublicacoesStoryNumero(publicacoesRealizadasStory)
            setPerfisSeguidosNumero(perfisSeguidos)

            setMeusLogs(window.api.ipcRenderer.sendSync('logCriador')[abaAtual])
            logss.scrollTop = logss.scrollHeight

            if(window.api.ipcRenderer.sendSync('logCriador')[abaAtual][window.api.ipcRenderer.sendSync('logCriador')[abaAtual].length - 1] == 'O robô terminou, pode voltar!'){
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
                navegadorAnonimo,
                userAgent,
                emailTemporario,
                quantidadePerfis: Number(quantidadePerfis),
                senhaPerfis,
                generoPerfis,
                limparLogin,
                comoSalvar,
                esperarEntre: Number(esperarEntre) * 1000,
                limparPastaPrefetch,
                limparPastaTemp,
                montarPerfis,
                aba: abaAtual
            })
        }

        setMontarPerfisCriados(montarPerfis == 'sim' ? true : false)
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/iniciarcriador`, configs)
        const resultado = await api.json()
        
    }, [])

    return (
        <>
            <Cabeca voltar='false'/>
            <Logs>
                {meusLogs.map((logs, index)=>(
                    logs === 'Acessando o instagram' || 
                    logs === 'Capturando o código' || 
                    logs === 'Capturando o email' || 
                    logs === 'Preenchendo dados' || 
                    logs === 'Escolhendo a data' || 
                    logs === 'Confirmando o código' || 
                    logs === 'Alterando o gênero do perfil' ||
                    logs === 'Alterando a biografia' || 
                    logs === 'Alterando a foto de perfil' ||
                    logs === 'Postando fotos no story' ||
                    logs === 'Postando fotos no Feed' ||
                    logs === 'Seguindo perfis sugeridos' ||
                    logs === 'Limpando atividade de login' ||
                    logs === 'Limpando a pasta Prefetch' ||
                    logs === 'Limpando a pasta Temp' ||
                    logs === 'O robô terminou, pode voltar!' ? 
                    <h1 key={index}>{logs}</h1> : 
                    <p key={index} style={{ color: logs.includes('sucesso') ? '#28a745' : '' }}>{logs}</p>
                ))}
            </Logs>
            <Rodape>
                <Opcao cor='#E53535'>
                    <span>Não criadas</span>
                    {naoCriadas}
                </Opcao>
                <Opcao cor='#28a745'>
                    <span>Criadas com sucesso</span>
                    {criadasSucesso}
                </Opcao>
                {montadorEmExecucao == true ?
                    <Opcao cor='orange'>
                        <span>Montador em execução</span>
                        <RiAlertFill/>
                    </Opcao>
                    :
                    ''
                }
                {montarPerfisCriados == true ?
                    <>
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
                    </> : ''
                }
            </Rodape>
        </>
    )
}

export { LogsCriador }