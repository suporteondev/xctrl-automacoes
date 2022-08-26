export async function iniciar(Mensagem, setMensagem){

    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const quantidadePublicacoesFeed = document.querySelector('[name="quantidadePublicacoesFeed"]').value
    const quantidadePublicacoesStory = document.querySelector('[name="quantidadePublicacoesStory"]').value
    const seguirPerfis = document.querySelector('[name="seguirPerfis"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')
    
    if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(quantidadePublicacoesFeed === ''){
        setMensagem(<Mensagem>Preencha a quantidade de publicações no feed</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(quantidadePublicacoesStory === ''){
        setMensagem(<Mensagem>Preencha a quantidade de publicações no story</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(seguirPerfis === ''){
        setMensagem(<Mensagem>Preencha a quantidade de perfis que deseja seguir</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarEntre === ''){
        setMensagem(<Mensagem>Preencha quantos segundos você quer esperar entre as ações</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{
        
        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/abrirabasmontador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Montador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
}