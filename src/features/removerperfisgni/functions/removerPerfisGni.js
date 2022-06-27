export async function removerPerfisGni(
    setMensagem, 
    setRemovendoPerfisGni, 
    setMeusLogs,
    setRemovidos,
    setSaldoPerdido,
    setDisplayVoltar
){

    // Configurações
    const visivel = document.querySelector('[name="visivel"]').value
    const anonimo = document.querySelector('[name="anonimo"]').value
    const userAgent = document.querySelector('[name="user-agent"]').value
    const acao = document.querySelector('[name="acao"]').value
    const email = document.querySelector('[name="email"]').value
    const senha = document.querySelector('[name="senha"]').value

    if(email == ''){
        return setMensagem('Preencha o campo de email')
    }else if(senha == ''){
        return setMensagem('Preencha o campo de senha')
    }
    
    // if(perfis == ''){
    //     return setMensagem('Preencha os perfis antes de verificar!')
    // }

    setRemovendoPerfisGni(true)
    window.api.ipcRenderer.sendSync('nao-redimensionar')

    var intervalo = setInterval(()=>{

        var perfisRemovidos = 0 
        var saldoPerdido = 0 

        window.api.ipcRenderer.sendSync('logRemoverPerfisGni').forEach((mensagem)=>{
            if(mensagem.includes('Perfil removido com sucesso!') == true){
                perfisRemovidos += 1
            }

            if(mensagem.includes('Perfis desativados: ') == true){
                perfisRemovidos = `${mensagem.split(' ')[2]}`
            }

            if(mensagem.includes('Saldo total perdido') == true){
                saldoPerdido = `R$${mensagem.split(' ')[3]}`
            }

            if(mensagem.includes('Saldo a ser perdido:') == true){
                saldoPerdido = `R$${mensagem.split(' ')[4]}`
            }
        })

        setRemovidos(perfisRemovidos)
        setSaldoPerdido(saldoPerdido)

        const logs = document.querySelector('#logs')
        setMeusLogs(window.api.ipcRenderer.sendSync('logRemoverPerfisGni'))
        logs.scrollTop = logs.scrollHeight

        if(window.api.ipcRenderer.sendSync('logRemoverPerfisGni')[window.api.ipcRenderer.sendSync('logRemoverPerfisGni').length - 1] == 'O robô terminou, pode voltar!'){
            setTimeout(clearInterval(intervalo), 3000)
            setDisplayVoltar('/painel') 
            logs.scrollTop = logs.scrollHeight
        }
    }, 1000)

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ visivel, anonimo, acao, email, senha, userAgent })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/removerperfisgni`, configs)
    const resultado = await api.json()
}