async function lerPerfisGerenciador(setPerfis){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/lerperfisgerenciador`, configs)
    const resultado = await api.json()

    setPerfis(resultado.perfis)
}

export { lerPerfisGerenciador }