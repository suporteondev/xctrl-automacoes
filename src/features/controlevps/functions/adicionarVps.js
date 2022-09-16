async function adicionarVps(setPerfisGerenciador){
    const nomeVPS = document.querySelector('#nome-vps').value

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nomeVPS })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/vps/adicionar`, configs)
    const resultado = await api.json()

    setPerfisGerenciador(resultado.perfis)
}

export { adicionarVps }