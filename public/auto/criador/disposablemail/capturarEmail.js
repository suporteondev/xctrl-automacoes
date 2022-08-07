const capturarEmail = async(identificador, pagina, logs)=>{
    try{
        // Acessando o cryptogmail
        logs.push('Capturando o email')
        await pagina.bringToFront()
        logs.push(`perfil ${identificador} - ` + 'Acessando o Disposablemail')
        await pagina.goto('https://www.disposablemail.com/delete', { timeout: 60000 })

        await pagina.waitForSelector('.glyphicon.glyphicon-trash')
        await pagina.click('.glyphicon.glyphicon-trash')

        // Capturando o email do cryptogmail
        logs.push(`perfil ${identificador} - ` + 'Capturando o email')
        await pagina.waitForSelector('[id="email"]')
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