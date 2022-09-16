async function verificarAcessos(
    setAcessoCriador,
    setAcessoMontador,
    setAcessoGerenciador
){

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const apiCriador = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/criador/acesso`, configs)
    const resultadoCriador = await apiCriador.json()

    if(resultadoCriador.ok == true){
        setAcessoCriador({
            status: resultadoCriador.status,
            data: resultadoCriador.data
        })
    }else if(resultadoCriador.ok == false){
        setAcessoCriador({
            status: resultadoCriador.status,
            data: resultadoCriador.data
        })
    }

    const apiMontador = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/montador/acesso`, configs)
    const resultadoMontador = await apiMontador.json()

    if(resultadoMontador.ok == true){
        setAcessoMontador({
            status: resultadoMontador.status,
            data: resultadoMontador.data
        })
    }else if(resultadoMontador.ok == false){
        setAcessoMontador({
            status: resultadoMontador.status,
            data: resultadoMontador.data
        })
    }

    const apiGerenciador = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/gerenciador/acesso`, configs)
    const resultadoGerenciador = await apiGerenciador.json()

    if(resultadoGerenciador.ok == true){
        setAcessoGerenciador({
            status: resultadoGerenciador.status,
            data: resultadoGerenciador.data
        })
    }else if(resultadoGerenciador.ok == false){
        setAcessoGerenciador({
            status: resultadoGerenciador.status,
            data: resultadoGerenciador.data
        })
    }
}

export { verificarAcessos }