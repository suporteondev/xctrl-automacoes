const capturarEmail = async(identificador, pagina, logs)=>{
    try{
        // Acessando o cryptogmail
        logs.push('Capturando o email')
        await pagina.bringToFront()
        logs.push(`perfil ${identificador} - ` + 'Acessando o Fakemail')
        await pagina.goto('https://www.fakemail.net/', { timeout: 60000 })

        // Esperando o botão de remover aparecer e clicando
        logs.push(`perfil ${identificador} - ` + 'Atualizando o email')
        await pagina.waitForSelector('[title="Delete this email address"]', { timeout: 60000 })
        await pagina.click('[title="Delete this email address"]')
        await pagina.waitForSelector('.glyphicon.glyphicon-trash')
        await pagina.click('.glyphicon.glyphicon-trash')
        await pagina.waitForTimeout(10000)

        // Capturando o email do cryptogmail
        logs.push(`perfil ${identificador} - ` + 'Capturando o email')
        const email = await pagina.evaluate(()=>{
            return document.querySelector('[id="email"]').innerText
        })

        logs.push(`perfil ${identificador} - ` + 'Email capturado com sucesso!')

        // Retornando o email
        return {
            ok: true,
            email: email
        }

    }catch(erro){
        console.log(erro.message)
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar capturar o email.')
        return {
            ok: false
        }
    }
}

module.exports = capturarEmail