async function filtrarTodosPerfis(){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/gerenciador/listar`, configs)
    const resultado = await api.json()

    return resultado.perfis
}

export { filtrarTodosPerfis }