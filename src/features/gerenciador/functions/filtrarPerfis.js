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

        if(filtro == 'menos10Publicacoes'){
            if(Number(perfil.publicacoes) < 10 && perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'mais10Publicacoes'){
            if(Number(perfil.publicacoes) > 9 && perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'menos30Seguidores'){
            if(Number(perfil.seguidores) < 30 && perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'mais30Seguidores'){
            if(Number(perfil.seguidores) > 29 && perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'mais20Seguindo'){
            if(Number(perfil.seguindo) > 19 && perfil.status == 'Ativo'){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'menos20Seguindo'){
            if(Number(perfil.seguindo) < 20 && perfil.status == 'Ativo'){
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