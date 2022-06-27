export async function apagarPerfis(setPerfis, setDisplayApagar, setBlur){
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
        body: JSON.stringify({ perfis })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/deletarperfis`, configs)
    const resultado = await api.json()
    
    if(resultado.ok == true){
        setPerfis(resultado.perfis)
        setDisplayApagar(false)
        setBlur(false)
    }
    
}