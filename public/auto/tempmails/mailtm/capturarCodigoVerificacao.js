const capturarCodigoVerificacao = async(identificador, pagina, logs)=>{
    try{

        logs.push('Capturando o código')
        await pagina.bringToFront()

        logs.push(`perfil ${identificador} - ` + 'Acessando o mail.tm')
        await pagina.goto('https://mail.tm/pt/', { timeout: 60000 })

        logs.push(`perfil ${identificador} - ` + 'Aguardando até 30 segundos para o código chegar.')
        await pagina.waitForTimeout(240000)

        const codigoChegou = await pagina.evaluate(()=>{
            let divs = document.querySelectorAll('div')
            let resultado = false

            for(let x = 0; x < divs.length; x++){
                const div = divs[x]
                if(div.innerText == 'Verify your account'){
                    div.click()
                    resultado = true
                    break
                }
            }

            return resultado
        })

        if(codigoChegou == false){
            return { ok: false }
        }

        // Capturando o código
        logs.push(`perfil ${identificador} - ` + 'Capturando o código')
        await pagina.waitForSelector('font[size="6"]')
        const codigo = await pagina.evaluate(()=>{
            return document.querySelector('font[size="6"]').innerText
        })

        // Retornando o código
        logs.push(`perfil ${identificador} - ` + 'Código capturado com sucesso')  

        return{
            ok: true,
            codigo: codigo
        }
    }catch(erro){
        console.log(erro.message)
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar capturar o código.')
        return{
            ok: false
        }
    }
    
}

module.exports = capturarCodigoVerificacao