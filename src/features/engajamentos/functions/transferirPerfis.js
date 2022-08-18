export async function transferirPerfis(setPerfis, setDisplayTransferir, setBlur, setDisplayTransferirCarregando){

    setDisplayTransferirCarregando('flex')

    const check = document.querySelectorAll('.checkbox')
    const email = document.querySelector('input[name="email"]').value
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
        body: JSON.stringify({ ref: email, perfis })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/transferirperfis`, configs)
    const resultado = await api.json()
    
    if(resultado.ok == true){
        setDisplayTransferirCarregando('none')
        setPerfis(resultado.perfis)
        setDisplayTransferir(false)
        setBlur(false)
    }
    
}