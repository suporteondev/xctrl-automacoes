export async function filtrarPerfis(
    setPerfisGerenciador, 
    setDisplayFiltrar, 
    setBlur
){

    const filtro = document.querySelector('#filtro').value
    const perfisGerenciador = window.api.ipcRenderer.sendSync('perfisGerenciador')
    const novoArray = []

    for(let x = 0; x < perfisGerenciador.length; x++){
        const perfil = perfisGerenciador[x]

        if(filtro == 'todos'){
            novoArray.push(perfil)
        }

        if(filtro == 'ativos'){
            if(perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'inativos'){
            if(perfil.status == 'Inativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'novamente'){
            if(perfil.status == 'Tentar novamente'){
                novoArray.push(perfil)
            }
        }
    }

    const checks = document.querySelectorAll('input[type="checkbox"]')

    checks.forEach((check)=>{
        check.checked = false
    })

    setPerfisGerenciador(novoArray)
    setDisplayFiltrar(false)
    setBlur(false)
}