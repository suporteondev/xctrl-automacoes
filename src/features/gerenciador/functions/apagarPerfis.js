async function apagarPerfis(
    setPerfisGerenciador,
    setDisplayApagar,
    setBlur
){

    const check = document.querySelectorAll('.checkbox')
    const perfis = []

    check.forEach((e)=>{
        if(e.checked == true){
            let perfil = e.parentElement.parentNode.querySelector('.usuario').innerText
            perfis.push(perfil)
        }
    })

    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            perfis 
        })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/gerenciador/apagar`, configs)
    const resultado = await api.json()

    setPerfisGerenciador(resultado.perfis)
    setBlur(false)
    setDisplayApagar(false)

    const checks = document.querySelectorAll('input[type="checkbox"]')

    checks.forEach((check)=>{
        check.checked = false
    })
}

export { apagarPerfis }