import { filtrarTodosPerfis } from "./filtrarTodosPerfis"

export async function filtrarPerfis(
    setPerfisGerenciador, 
    setDisplayFiltrar, 
    setBlur
){

    const filtro = document.querySelector('#filtro').value
    const perfisGerenciador = await filtrarTodosPerfis()
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

        if(filtro == 'perfisZerados'){
            if(
                Number(perfil.seguindo) == 0 && 
                Number(perfil.publicacoes) == 0 && 
                Number(perfil.seguidores) == 0 && 
                perfil.status == 'Ativo'
            ){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'qtdPublicacoes'){
            const quantidade = document.querySelector('#quantidade').value
            if(
                Number(perfil.publicacoes) == Number(quantidade) &&
                perfil.status == 'Ativo'
            ){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'qtdSeguidores'){
            const quantidade = document.querySelector('#quantidade').value
            if(
                Number(perfil.seguidores) == Number(quantidade) &&
                perfil.status == 'Ativo'
            ){
                novoArray.push(perfil)
            }
        }

        if(filtro == 'qtdSeguindo'){
            const quantidade = document.querySelector('#quantidade').value
            if(
                Number(perfil.seguindo) == Number(quantidade) &&
                perfil.status == 'Ativo'
            ){
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