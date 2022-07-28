const capturarEmail = async(identificador, pagina, logs)=>{
    try{
        // Acessando o cryptogmail
        logs.push('Capturando o email')
        await pagina.bringToFront()
        logs.push(`perfil ${identificador} - ` + 'Acessando o cryptogmail')
        const cookies = await pagina.cookies()
        await pagina.deleteCookie(...cookies)
        await pagina.goto('https://cryptogmail.com/')
        
        // Esperando o botão de remover aparecer e clicando
        logs.push(`perfil ${identificador} - ` + 'Atualizando o email')
        await pagina.waitForSelector('a[onclick="_temp_mail.removeEmailBox()"]')
        await pagina.click('a[onclick="_temp_mail.removeEmailBox()"]')
        await pagina.waitForTimeout(2000)

        // Capturando o email do cryptogmail
        logs.push(`perfil ${identificador} - ` + 'Capturando o email')
        const email = await pagina.evaluate(()=>{
            return document.querySelector('.field--value.js-email').innerText
        })

        logs.push(`perfil ${identificador} - ` + 'Email capturado com sucesso!')

        // Retornando o email
        return {
            ok: true,
            email: email
        }

    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar capturar o email.')
        return {
            ok: false
        }
    }
}

module.exports = capturarEmail