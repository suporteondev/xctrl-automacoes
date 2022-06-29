async function filtrarPorUsuario(setPerfis){

    const usuario = document.querySelector('#usuario').value

    if(usuario == ''){

    }else{
        const configs = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filtro: usuario })
        }
    
        // Chamando a rota de cadastro
        const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/filtrarporusuario`, configs)
        const resultado = await api.json()
    
        setPerfis(resultado.perfis)
    }
}

export { filtrarPorUsuario }