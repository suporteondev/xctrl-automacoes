export async function iniciar(Mensagem, setMensagem, setExecutando, setMeusLogs, setAtivos, setNovamentes, setInativos, setAverificar, setDisplayVoltar){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

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
        window.api.ipcRenderer.sendSync('tamanho-pequeno')

        var intervalo = setInterval(()=>{

            var perfisAtivos = 0 
            var perfisInativos = 0 
            var perfisNovamente = 0 

            window.api.ipcRenderer.sendSync('logVerificador').forEach((mensagem)=>{
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
            setAverificar(arrayPerfis.length - (perfisAtivos + perfisInativos + perfisNovamente))
            
            setMeusLogs(window.api.ipcRenderer.sendSync('logVerificador'))
            logs.scrollTop = logs.scrollHeight

            if(window.api.ipcRenderer.sendSync('logVerificador')[window.api.ipcRenderer.sendSync('logVerificador').length - 1] == 'O robô terminou, pode voltar!'){
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
                caminhoNavegador,
                verAcontecendo, 
                modoAnonimo, 
                userAgent,
                seusPerfis: arrayPerfis, 
                limparLogin,
                esperarEntre: Number(esperarEntre) * 1000 
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/verificador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Verificador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}