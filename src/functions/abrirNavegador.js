async function abrirNavegador(url){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/abrirnavegador`, configs)
    const resultado = await api.json()
}

export { abrirNavegador }