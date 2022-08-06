export async function iniciar(
    Mensagem, 
    setMensagem, 
    setExecutando, 
    setMeusLogs, 
    setCriadasSucesso, 
    setNaoCriadas, 
    setDisplayVoltar,
    setFotosPerfisNumero,
    setBiografiasAlteradasNumero,
    setPublicacoesRealizadasNumero,
    setPublicacoesStoryNumero,
    setPerfisSeguidosNumero,
    setMontarPerfisCriados
){

    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const navegadorAnonimo = document.querySelector('[name="navegadorAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const emailTemporario = document.querySelector('[name="emailTemporario"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const montarPerfis = document.querySelector('[name="montarPerfis"]').value
    const logs = document.querySelector('#logs')

    if(quantidadePerfis === '' || quantidadePerfis === '0' || quantidadePerfis === 0){
        setMensagem(<Mensagem>A quantidade de perfis deve ser maior do que 0!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPerfis === ''){
        setMensagem(<Mensagem>Configure a senha dos perfis!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarEntre === ''){
        setMensagem(<Mensagem>Configure o tempo que deseja esperar entre as criações!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        setMensagem(<Mensagem cor='sucesso'>Criador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight

        setExecutando(true)
        if(montarPerfis == 'sim'){
            window.api.ipcRenderer.sendSync('tamanho-pequeno-3x')
            setMontarPerfisCriados(true)
        }else{
            window.api.ipcRenderer.sendSync('tamanho-pequeno')
            setMontarPerfisCriados(false)
        }
        var intervalo = setInterval(()=>{

            var criadasComSucesso = 0
            var naoCriadas = 0 

            var fotoPerfilAlteradas = 0 
            var biografiasAlteradas = 0 
            var publicacoesRealizadas = 0 
            var publicacoesRealizadasStory = 0 
            var perfisSeguidos = 0 

            window.api.ipcRenderer.sendSync('logCriador').forEach((mensagem)=>{
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
            })

            setCriadasSucesso(criadasComSucesso)
            setNaoCriadas(naoCriadas)
            setFotosPerfisNumero(fotoPerfilAlteradas)
            setBiografiasAlteradasNumero(biografiasAlteradas)
            setPublicacoesRealizadasNumero(publicacoesRealizadas)
            setPublicacoesStoryNumero(publicacoesRealizadasStory)
            setPerfisSeguidosNumero(perfisSeguidos)

            setMeusLogs(window.api.ipcRenderer.sendSync('logCriador'))
            logs.scrollTop = logs.scrollHeight

            if(window.api.ipcRenderer.sendSync('logCriador')[window.api.ipcRenderer.sendSync('logCriador').length - 1] == 'O robô terminou, pode voltar!'){
                setTimeout(clearInterval(intervalo), 3000)
                logs.scrollTop = logs.scrollHeight
                setDisplayVoltar('/painel')
            }
        }, 1000)

        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                montarPerfis
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/criador`, configs)
        const resultado = await api.json()

        if(resultado.ok == false){
            setMensagem(<Mensagem>{resultado.mensagem}</Mensagem>)
            logs.scrollTop = logs.scrollHeight
        }
    }

}