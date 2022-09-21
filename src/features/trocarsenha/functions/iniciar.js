export async function iniciar(
    Mensagem, 
    setMensagem,
    setMeusLogs,
    setDisplayVoltar,
    setExecutando,
    setSenhasAlteradas,
    setSenhasNaoAlteradas
){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value    
    const novaSenha = document.querySelector('[name="novaSenha"]').value    
    const limparLogin = document.querySelector('[name="limparLogin"]').value    
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value    
    const logs = document.querySelector('#logs')
    const arrayPerfis = []

    if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
    else if(novaSenha.length < 6){
        setMensagem(<Mensagem>A nova senha deve ter mais do que 6 dígitos</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
    else{

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
    
            var senhasAltearadasNumero = 0 
            var senhasNaoAlteradasNumero = 0
    
            window.api.ipcRenderer.sendSync('logTrocarSenha').forEach((mensagem)=>{
                if(mensagem.includes('Senha alterada com sucesso!') == true){
                    senhasAltearadasNumero += 1
                }
    
                if(
                    mensagem.includes('Não conseguimos alterar a senha desse perfil!') == true ||
                    mensagem.includes('Erro ao tentar acessar o perfil!') == true
                ){
                    senhasNaoAlteradasNumero += 1
                }
            })
    
            setSenhasAlteradas(senhasAltearadasNumero)
            setSenhasNaoAlteradas(senhasNaoAlteradasNumero)
            
            setMeusLogs(window.api.ipcRenderer.sendSync('logTrocarSenha'))
            logs.scrollTop = logs.scrollHeight
    
            if(window.api.ipcRenderer.sendSync('logTrocarSenha')[window.api.ipcRenderer.sendSync('logTrocarSenha').length - 1] == 'O robô terminou, pode voltar!'){
                setMeusLogs(window.api.ipcRenderer.sendSync('logTrocarSenha'))
                setTimeout(clearInterval(intervalo), 3000)
                logs.scrollTop = logs.scrollHeight
                setDisplayVoltar('/gerenciador')
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
                novaSenha,
                limparLogin,
                esperarEntre: Number(esperarEntre) * 1000
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/gerenciador/trocarsenha`, configs)
        const resultado = await api.json()
        
    }
}