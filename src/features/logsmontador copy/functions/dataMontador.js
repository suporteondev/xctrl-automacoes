async function dataMontador(setDataMontador){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/acessomontador`, configs)
    const resultado = await api.json()

    if(resultado.ok == true){
        setDataMontador(resultado.data)
    }
}

export { dataMontador }