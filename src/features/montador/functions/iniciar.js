export async function iniciar(
    Mensagem, 
    setMensagem, 
    setExecutando, 
    setMeusLogs,  
    setFotosPerfisNumero, 
    setBiografiasAlteradasNumero, 
    setPublicacoesRealizadasNumero, 
    setPublicacoesStoryNumero,
    setPerfisSeguidosNumero,
    setDisplayVoltar
){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const alterarFotoPerfil = document.querySelector('[name="alterarFotoPerfil"]').value
    const alterarBiografia = document.querySelector('[name="alterarBiografia"]').value
    const quantidadePublicacoesFeed = document.querySelector('[name="quantidadePublicacoesFeed"]').value
    const quantidadePublicacoesStory = document.querySelector('[name="quantidadePublicacoesStory"]').value
    const seguirPerfis = document.querySelector('[name="seguirPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const cadastrarSigaSocial = document.querySelector('[name="cadastrarSigaSocial"]').value
    const emailSigaSocial = document.querySelector('[name="emailSigaSocial"]').value
    const senhaSigaSocial = document.querySelector('[name="senhaSigaSocial"]').value
    const metaSigaSocial = document.querySelector('[name="metaSigaSocial"]').value
    const quantidadeAcoesSigaSocial = document.querySelector('[name="quantidadeAcoesSigaSocial"]').value
    const tempoEntreAcoesSigaSocial = document.querySelector('[name="tempoEntreAcoesSigaSocial"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')
    
    if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(quantidadePublicacoesFeed === ''){
        setMensagem(<Mensagem>Preencha a quantidade de publicações no feed</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(quantidadePublicacoesStory === ''){
        setMensagem(<Mensagem>Preencha a quantidade de publicações no story</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(seguirPerfis === ''){
        setMensagem(<Mensagem>Preencha a quantidade de perfis que deseja seguir</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(esperarEntre === ''){
        setMensagem(<Mensagem>Preencha quantos segundos você quer esperar entre as ações</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        let user_token = ''

        if(cadastrarSigaSocial == 'sim'){
            if(emailSigaSocial == ''){
                setMensagem(<Mensagem>Preencha seu email do siga social</Mensagem>)
                logs.scrollTop = logs.scrollHeight
                return
            }
        
            else if(senhaSigaSocial == ''){
                setMensagem(<Mensagem>Preencha sua senha do siga social</Mensagem>)
                logs.scrollTop = logs.scrollHeight
                return
            }
        
            else if(quantidadeAcoesSigaSocial == '' || quantidadeAcoesSigaSocial == '0' || quantidadeAcoesSigaSocial == 0){
                setMensagem(<Mensagem>Preencha a quantidade de ações do siga social</Mensagem>)
                logs.scrollTop = logs.scrollHeight
                return
            }
        
            else if(tempoEntreAcoesSigaSocial == '' || tempoEntreAcoesSigaSocial == '0' || tempoEntreAcoesSigaSocial == 0){
                setMensagem(<Mensagem>Preencha o tempo entre as ações do siga social</Mensagem>)
                logs.scrollTop = logs.scrollHeight
                return
            }

            const configAPI = {
                c: "api",
                m: "loginUserC",
                api_key: "f06dcea2defb2f9b8aa948a3cbac0d17",
                login: emailSigaSocial,
                password: senhaSigaSocial
            }

            const configs = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(configAPI)
            }
        
            const api2 = await fetch('https://siga.social/', configs)
            const resultadoSigaSocial = await api2.json()
        
            if(resultadoSigaSocial.status == 'error'){
                setMensagem(<Mensagem cor='sucesso'>Siga social diz: {resultadoSigaSocial.error}</Mensagem>)
                logs.scrollTop = logs.scrollHeight
                return false
            }else{
                user_token = resultadoSigaSocial.data.usertoken
            }
        }

        setMensagem(<Mensagem cor='sucesso'>Montador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight

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

        setExecutando(true)
        window.api.ipcRenderer.sendSync('tamanho-pequeno-2x')

        var intervalo = setInterval(()=>{ 

            var fotoPerfilAlteradas = 0 
            var biografiasAlteradas = 0 
            var publicacoesRealizadas = 0 
            var publicacoesRealizadasStory = 0 
            var perfisSeguidos = 0 

            window.api.ipcRenderer.sendSync('logMontador').forEach((mensagem)=>{
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

            setMeusLogs(window.api.ipcRenderer.sendSync('logMontador'))
            logs.scrollTop = logs.scrollHeight
            if(window.api.ipcRenderer.sendSync('logMontador')[window.api.ipcRenderer.sendSync('logMontador').length - 1] == 'O robô terminou, pode voltar!'){
                setMeusLogs(window.api.ipcRenderer.sendSync('logMontador'))
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
                userToken: user_token,
                metaSigaSocial,
                quantidadeAcoesSigaSocial,
                tempoEntreAcoesSigaSocial,
                esperarEntre: Number(esperarEntre) * 1000
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/montador/iniciar`, configs)
        const resultado = await api.json()
    }
}