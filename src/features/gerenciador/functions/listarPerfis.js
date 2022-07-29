export function listarPerfis(){

    const check = document.querySelectorAll('.checkbox')
    const perfis = []

    check.forEach((e)=>{
        if(e.checked == true){
            let usuario = e.parentElement.parentNode.querySelector('.usuario').innerText
            let senha = e.parentElement.parentNode.querySelector('.senha').innerText
            perfis.push({
                usuario,
                senha
            })
        }
    })

    var html = ''

    if(document.querySelector('#copiar').value == 'usuarios'){
        perfis.forEach((perfil)=>{
            html += `${perfil.usuario}\n`
        })
    }else if(document.querySelector('#copiar').value == 'linha'){
        perfis.forEach((perfil)=>{
            html += `${perfil.usuario} ${perfil.senha}\n`
        })
    }else if(document.querySelector('#copiar').value == 'coluna'){
        perfis.forEach((perfil)=>{
            html += `${perfil.usuario}\n${perfil.senha}\n\n`
        })
    }

    document.querySelector('#textarea-perfis').value = html
}