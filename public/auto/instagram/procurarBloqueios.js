async function procurarBloqueios(pagina, usuario, logs){
    try {
        logs.push(`${usuario} - Procurando bloqueios...`)
        const bloqueio = await pagina.evaluate(()=>{
            let resultado = false
            let refs = document.querySelectorAll('span')
            let refsH3 = document.querySelectorAll('h3')

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

            for(let y = 0; y < refsH3.length; y++){
                const e2 = refsH3[y]
                if(e2.innerText == 'Adicionar telefone para voltar ao Instagram'){
                    resultado = true
                    break
                }
            }

            return resultado
        })
        bloqueio == true ? logs.push(`${usuario} - O perfil está bloqueado!`) : ''
        bloqueio == false ? logs.push(`${usuario} - Sem bloqueios!`) : ''
        return bloqueio
    }catch(erro){
        return false
    }
}

module.exports = procurarBloqueios