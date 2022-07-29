export async function filtrarPorUsuario(
    setPerfisGerenciador
){
    const usuario = document.querySelector('[name="usuarioPesquisado"]').value
    
    if(usuario != ''){
        const perfisGerenciador = window.api.ipcRenderer.sendSync('perfisGerenciador')
        const novoArray = []

        for(let x = 0; x < perfisGerenciador.length; x++){
            const perfil = perfisGerenciador[x]

            if(perfil.usuario == usuario){
                novoArray.push(perfil)
            }
        }

        const checks = document.querySelectorAll('input[type="checkbox"]')

        checks.forEach((check)=>{
            check.checked = false
        })

        setPerfisGerenciador(novoArray)
    }
}