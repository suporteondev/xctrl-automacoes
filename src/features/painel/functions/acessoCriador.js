async function acessoCriador(setMeuAcessoCriador){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/acessocriador`, configs)
    const resultado = await api.json()

    if(resultado.ok == true){
        setMeuAcessoCriador(resultado.status)
    }
}

export { acessoCriador }