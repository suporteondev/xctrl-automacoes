export async function iniciar(
    Mensagem, 
    setMensagem, 
    setExecutando, 
    setMeusLogs, 
    setCriadasSucesso, 
    setCriadasSMS, 
    setNaoCriadas, 
    setDisplayVoltar
){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const provedorEmail = document.querySelector('[name="provedorEmail"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const ondeSalvar = document.querySelector('[name="ondeSalvar"]').value
    const esperarSegundos = document.querySelector('[name="esperarSegundos"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(ondeSalvar === ''){
        setMensagem(<Mensagem>Preencha onde salvar os seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarSegundos === ''){
        setMensagem(<Mensagem>Selecione quantos segundos deseja esperar entre as criações</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(quantidadePerfis === ''){
        setMensagem(<Mensagem>Selecione a quantidade de perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPerfis === ''){
        setMensagem(<Mensagem>Preencha a senha dos perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        setExecutando(true)
        window.api.ipcRenderer.sendSync('tamanho-pequeno')
        
        var intervalo = setInterval(()=>{

            // var perfisDesativados = 0 
            // var saldoPerdido = 'R$0.00' 

            // window.api.ipcRenderer.sendSync('logRemovedor').forEach((mensagem)=>{
            //     if(mensagem.includes('Perfis desativados') == true){
            //         perfisDesativados = mensagem.split(' ')[2]
            //     }

            //     if(mensagem.includes('Perfil removido com sucesso!') == true){
            //         perfisDesativados += 1
            //     }

            //     if(mensagem.includes('Saldo a ser perdido') == true){
            //         saldoPerdido = `R$${mensagem.split(' ')[4]}`
            //     }

            //     if(mensagem.includes('Saldo total perdido') == true){
            //         saldoPerdido = `R$${mensagem.split(' ')[3]}`
            //     }
            // })

            // setPerfisDesativados(perfisDesativados)
            // setSaldoPerdido(saldoPerdido)
            
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
                provedorEmail,
                quantidadePerfis,
                generoPerfis,
                senhaPerfis,
                comoSalvar,
                ondeSalvar,
                esperarSegundos
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/criador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Criador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}