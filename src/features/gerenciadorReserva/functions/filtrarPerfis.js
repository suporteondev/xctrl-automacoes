export async function filtrarPerfis(setPerfis, setDisplayFiltrar, setBlur, setDisplayFiltrarCarregando){

    setDisplayFiltrarCarregando('flex')

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filtro: document.querySelector('#filtro').value })
    }

    // Chamando a rota de cadastro
    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/filtrar`, configs)
    const resultado = await api.json()

    if(resultado.ok == true){
        setDisplayFiltrarCarregando('none')
        setPerfis(resultado.perfis)
        setDisplayFiltrar(false)
        setBlur(false)
    }
}