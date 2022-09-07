export async function iniciar(
    Mensagem, 
    setMensagem, 
    setExecutando, 
    setMeusLogs,
    setDisplayVoltar
){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const vincularPerfisNaoCadastrados = document.querySelector('[name="vincularPerfisNaoCadastrados"]').value
    const assistirStoryEntreXAcoes = document.querySelector('[name="assistirStoryEntreXAcoes"]').value
    const assistirStoryPorXSegundos = document.querySelector('[name="assistirStoryPorXSegundos"]').value
    const quantidadeAcoes = document.querySelector('[name="quantidadeAcoes"]').value
    const esperarEntreAcoes = document.querySelector('[name="esperarEntreAcoes"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const qualPlataforma = document.querySelector('[name="qualPlataforma"]').value
    const emailPlataforma = document.querySelector('[name="emailPlataforma"]').value
    const senhaPlataforma = document.querySelector('[name="senhaPlataforma"]').value
    const logs = document.querySelector('#logs')
    
    if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(assistirStoryEntreXAcoes === '' || Number(assistirStoryEntreXAcoes) < 3){
        setMensagem(<Mensagem>(Assistir Story a cada "X" ações) deve ser maior do que 3</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(assistirStoryPorXSegundos === '' || Number(assistirStoryPorXSegundos) < 10){
        setMensagem(<Mensagem>(Assistir Story por "X" segundos) deve ser maior do que 10 segundos</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(quantidadeAcoes === '' || Number(quantidadeAcoes) < 1){
        setMensagem(<Mensagem>(Realizar quantas ações por perfil?) deve ser maior do que 0</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(esperarEntreAcoes === ''){
        setMensagem(<Mensagem>(Esperar entre cada ação (Segundos)) não pode estar vazia</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
    
    else if(emailPlataforma === ''){
        setMensagem(<Mensagem>Preencha o email da plataforma antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

    else if(senhaPlataforma === ''){
        setMensagem(<Mensagem>Preencha a senha da plataforma antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
    
    else{
        
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

            setMeusLogs(window.api.ipcRenderer.sendSync('logRealizador'))
            logs.scrollTop = logs.scrollHeight

            if(window.api.ipcRenderer.sendSync('logRealizador')[window.api.ipcRenderer.sendSync('logRealizador').length - 1] == 'O robô terminou, pode voltar!'){
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
                modoPerfis,
                seusPerfis: arrayPerfis,
                vincularPerfisNaoCadastrados,
                assistirStoryEntreXAcoes: Number(assistirStoryEntreXAcoes),
                assistirStoryPorXSegundos: Number(assistirStoryPorXSegundos) * 1000,
                quantidadeAcoes: Number(quantidadeAcoes),
                esperarEntreAcoes: Number(esperarEntreAcoes) * 1000,
                limparLogin,
                qualPlataforma,
                emailPlataforma,
                senhaPlataforma
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/realizador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Realizador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
}