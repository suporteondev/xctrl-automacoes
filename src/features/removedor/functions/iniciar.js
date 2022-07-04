export async function iniciar(
    Mensagem, 
    setMensagem, 
    setExecutando, 
    setMeusLogs, 
    setPerfisDesativados, 
    setSaldoPerdido, 
    setDisplayVoltar
){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const emailPlataforma = document.querySelector('[name="emailPlataforma"]').value
    const senhaPlataforma = document.querySelector('[name="senhaPlataforma"]').value
    const tipoAcao = document.querySelector('[name="tipoAcao"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(emailPlataforma === ''){
        setMensagem(<Mensagem>Preencha o email da plataforma antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPlataforma === ''){
        setMensagem(<Mensagem>Preencha a senha da plataforma antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        setExecutando(true)
        window.api.ipcRenderer.sendSync('tamanho-pequeno')
        
        var intervalo = setInterval(()=>{

            var perfisDesativados = 0 
            var saldoPerdido = 'R$0.00' 

            window.api.ipcRenderer.sendSync('logRemovedor').forEach((mensagem)=>{
                if(mensagem.includes('Perfis desativados') == true){
                    perfisDesativados = mensagem.split(' ')[2]
                }

                if(mensagem.includes('Perfil removido com sucesso!') == true){
                    perfisDesativados += 1
                }

                if(mensagem.includes('Saldo a ser perdido') == true){
                    saldoPerdido = `R$${mensagem.split(' ')[4]}`
                }

                if(mensagem.includes('Saldo total perdido') == true){
                    saldoPerdido = `R$${mensagem.split(' ')[3]}`
                }
            })

            setPerfisDesativados(perfisDesativados)
            setSaldoPerdido(saldoPerdido)
            
            setMeusLogs(window.api.ipcRenderer.sendSync('logRemovedor'))
            logs.scrollTop = logs.scrollHeight

            if(window.api.ipcRenderer.sendSync('logRemovedor')[window.api.ipcRenderer.sendSync('logRemovedor').length - 1] == 'O robô terminou, pode voltar!'){
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
                emailPlataforma,
                senhaPlataforma,
                tipoAcao
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/removedor`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Removedor iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}