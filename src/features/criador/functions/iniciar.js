export async function iniciar(Mensagem, setMensagem){

    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const montarPerfis = document.querySelector('[name="montarPerfis"]').value
    const logs = document.querySelector('#logs')

    if(quantidadePerfis === '' || quantidadePerfis === '0' || quantidadePerfis === 0){
        setMensagem(<Mensagem>A quantidade de perfis deve ser maior do que 0!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPerfis === ''){
        setMensagem(<Mensagem>Configure a senha dos perfis!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(esperarEntre === ''){
        setMensagem(<Mensagem>Configure o tempo que deseja esperar entre as criações!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{

        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                montar: montarPerfis
            })
        }
    
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/abrirabascriador`, configs)
        const resultado = await api.json()

        if(resultado.ok == false){
            setMensagem(<Mensagem>{resultado.mensagem}</Mensagem>)
            logs.scrollTop = logs.scrollHeight
        }else if(resultado.ok == true){
            setMensagem(<Mensagem cor='sucesso'>Criador iniciado com sucesso!</Mensagem>)
            logs.scrollTop = logs.scrollHeight
        }
    }

}