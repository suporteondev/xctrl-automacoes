export async function apagarPerfis(
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

    const perfisGerenciador = window.api.ipcRenderer.sendSync('perfisGerenciador')

    for(let x = 0; x < perfis.length; x++){
        const usuarioPerfil = perfis[x]
        
        perfisGerenciador.forEach((perfil, index)=>{
            if(perfil.usuario == usuarioPerfil){
                perfisGerenciador.splice(index, 1)
            }
        })

        window.api.ipcRenderer.sendSync('setPerfisGerenciador', perfisGerenciador)
    }

    const checks = document.querySelectorAll('input[type="checkbox"]')

    checks.forEach((check)=>{
        check.checked = false
    })

    setPerfisGerenciador(perfisGerenciador)
    setDisplayApagar(false)
    setBlur(false)
}