async function procurarBloqueios(pagina, usuario, logs){
    logs.push(`${usuario} - Procurando bloqueios...`)
    const bloqueio = await pagina.evaluate(()=>{
        let resultado = false
        let refs = document.querySelectorAll('span')
        for(let x = 0; x < refs.length; x++){
            const e = refs[x]
            if(e.innerText.indexOf('Suspendemos sua conta') >= 0){
                resultado = true
                break
            }

            if(e.innerText == 'Sua conta foi temporariamente bloqueada'){
                resultado = true
                break
            }
        }
        return resultado
    })
    bloqueio == true ? logs.push(`${usuario} - O perfil está bloqueado!`) : ''
    bloqueio == false ? logs.push(`${usuario} - Sem bloqueios!`) : ''
    return bloqueio
}

module.exports = procurarBloqueios