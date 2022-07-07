async function acessoGerenciador(setMeuAcessoGerenciador){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/acessogerenciador`, configs)
    const resultado = await api.json()

    if(resultado.ok == true){
        setMeuAcessoGerenciador(resultado.status)
    }
}

export { acessoGerenciador }