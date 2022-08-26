export async function iniciar(Mensagem, setMensagem){

    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const logs = document.querySelector('#logs')
    
    if(seusPerfis === ''){
        setMensagem(<Mensagem>Preencha seus perfis antes de iniciar</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{
        
        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/abrirabasverificador`, configs)
        const resultado = await api.json()

        setMensagem(<Mensagem cor='sucesso'>Verificador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }
}