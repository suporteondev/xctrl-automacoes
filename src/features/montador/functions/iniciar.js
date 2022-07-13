export async function iniciar(Mensagem, setMensagem, setExecutando, setMeusLogs, setAtivos, setNovamentes, setInativos, setAverificar, setDisplayVoltar){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const listaPerfis = document.querySelector('[name="listaPerfis"]').value
    const pastaFotos = document.querySelector('[name="pastaFotos"]').value
    const fotoPerfil = document.querySelector('[name="fotoPerfil"]').value
    const alterarBiografia = document.querySelector('[name="alterarBiografia"]').value
    const quantidadePublicacoes = document.querySelector('[name="quantidadePublicacoes"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(listaPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(pastaFotos === ''){
        setMensagem(<Mensagem>Preencha a pasta de fotos antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(pastaFotos === ''){
        setMensagem(<Mensagem>Preencha a pasta de fotos antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(quantidadePublicacoes === ''){
        setMensagem(<Mensagem>Preencha a quantidade de publicações antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarEntre === ''){
        setMensagem(<Mensagem>Preencha o tempo entre as publicações antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        const arrayPerfis = []
            
        if(modoPerfis == 'linha'){
            listaPerfis.split('\n').forEach((usuario)=>{
                const arrayDados = usuario.split(' ')
                arrayPerfis.push({ 
                    usuario: arrayDados[0], 
                    senha: arrayDados[1] 
                })
            })
        }else if(modoPerfis == 'coluna'){
            const meusPerfis = listaPerfis.split('\n\n')
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
            setMeusLogs(window.api.ipcRenderer.sendSync('logMontador'))
            logs.scrollTop = logs.scrollHeight
            if(window.api.ipcRenderer.sendSync('logMontador')[window.api.ipcRenderer.sendSync('logMontador').length - 1] == 'O robô terminou, pode voltar!'){
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
                generoPerfis,
                modoPerfis,
                listaPerfis: arrayPerfis,
                pastaFotos,
                fotoPerfil,
                alterarBiografia,
                quantidadePublicacoes,
                limparLogin,
                esperarEntre
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/montador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Montador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}