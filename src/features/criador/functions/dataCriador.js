async function dataCriador(setDataAcessoCriador){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/criador/acesso`, configs)
    const resultado = await api.json()

    if(resultado.ok == true){
        setDataAcessoCriador(resultado.data)
    }
}

export { dataCriador }