export async function iniciar(Mensagem, setMensagem, setExecutando, setMeusLogs, setCriadasSucesso, setNaoCriadas, setDisplayVoltar){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const emailTemporario = document.querySelector('[name="emailTemporario"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const ondeSalvar = document.querySelector('[name="ondeSalvar"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(quantidadePerfis === '' || quantidadePerfis === '0' || quantidadePerfis === 0){
        setMensagem(<Mensagem>A quantidade de perfis deve ser maior do que 0!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPerfis === ''){
        setMensagem(<Mensagem>Configure a senha dos perfis!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(ondeSalvar === ''){
        setMensagem(<Mensagem>Configure onde salvar os perfis!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarEntre === ''){
        setMensagem(<Mensagem>Configure o tempo que deseja esperar entre as criações!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        setMensagem(<Mensagem cor='sucesso'>Criador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight

        setExecutando(true)
        window.api.ipcRenderer.sendSync('tamanho-pequeno')
        var intervalo = setInterval(()=>{

            var criadasComSucesso = 0
            var naoCriadas = 0 

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
            })

            setCriadasSucesso(criadasComSucesso)
            setNaoCriadas(naoCriadas)

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
                caminhoNavegador,
                modoInvisivel,
                modoAnonimo,
                userAgent,
                emailTemporario,
                quantidadePerfis,
                senhaPerfis,
                generoPerfis,
                limparLogin,
                comoSalvar,
                ondeSalvar,
                esperarEntre
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/criador`, configs)
        const resultado = await api.json()

        // setMensagem(<Mensagem cor='sucesso'>Verificador iniciado com sucesso!</Mensagem>)
        // logs.scrollTop = logs.scrollHeight
    }

}