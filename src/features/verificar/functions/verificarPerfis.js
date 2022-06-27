export async function verificarPerfis(setMensagem, setVerificando, setMeusLogs, setAtivos, setInativos, setNovamentes, setVerificados, setAverificar, setDisplayVoltar){

    // Configurações
    const visivel = document.querySelector('[name="visivel"]').value
    const login = document.querySelector('[name="login"]').value
    const anonimo = document.querySelector('[name="anonimo"]').value
    const userAgent = document.querySelector('[name="user-agent"]').value
    const tempo = document.querySelector('[name="tempo"]').value
    const modo = document.querySelector('[name="modo"]').value
    const perfis = document.querySelector('[name="perfis"]').value

    if(perfis == ''){
        return setMensagem('Preencha os perfis antes de verificar!')
    }

    const arrayPerfis = []
            
    if(modo == 'linha'){
        perfis.split('\n').forEach((usuario)=>{
            const arrayDados = usuario.split(' ')
            arrayPerfis.push({ 
                usuario: arrayDados[0], 
                senha: arrayDados[1] 
            })
        })
    }else if(modo == 'coluna'){
        const meusPerfis = perfis.split('\n\n')
        meusPerfis.forEach((perfil)=>{
            arrayPerfis.push({
                usuario: perfil.split('\n')[0],
                senha: perfil.split('\n')[1]
            })
        })
    }

    setVerificando(true)
    window.api.ipcRenderer.sendSync('nao-redimensionar')

    var intervalo = setInterval(()=>{

        var perfisAtivos = 0 
        var perfisInativos = 0 
        var perfisNovamente = 0 

        window.api.ipcRenderer.sendSync('logVerificar').forEach((mensagem)=>{
            if(mensagem.includes('Perfil ativo') == true){
                perfisAtivos += 1
            }

            if(mensagem.includes('Tente novamente') == true){
                perfisNovamente += 1
            }

            if(mensagem.includes('Perfil inativo') == true){
                perfisInativos += 1
            }
        })

        setAtivos(perfisAtivos)
        setInativos(perfisInativos)
        setNovamentes(perfisNovamente)
        setVerificados(perfisAtivos + perfisInativos + perfisNovamente)
        setAverificar(arrayPerfis.length - (perfisAtivos + perfisInativos + perfisNovamente))

        const logs = document.querySelector('#logs')
        
        setMeusLogs(window.api.ipcRenderer.sendSync('logVerificar'))
        logs.scrollTop = logs.scrollHeight

        if(window.api.ipcRenderer.sendSync('logVerificar')[window.api.ipcRenderer.sendSync('logVerificar').length - 1] == 'O robô terminou, pode voltar!'){
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
        body: JSON.stringify({ visivel, login, anonimo, userAgent, tempo, perfis: arrayPerfis })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/verificar`, configs)
    const resultado = await api.json()
}