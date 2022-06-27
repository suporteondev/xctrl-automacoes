async function filtrarTodosPerfis(setPerfis){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/perfis`, configs)
    const resultado = await api.json()

    setPerfis(resultado.perfis)
}

export { filtrarTodosPerfis }