const capturarEmail = async(identificador, pagina, logs)=>{
    try{
        // Acessando o cryptogmail
        logs.push('Capturando o email')
        await pagina.bringToFront()
        logs.push(`perfil ${identificador} - ` + 'Acessando o mail.tm')
        await pagina.goto('https://mail.tm/pt/', { timeout: 60000 })

        // Esperando o botão de remover aparecer e clicando
        logs.push(`perfil ${identificador} - ` + 'Atualizando o email')
        await pagina.waitForSelector('button[id="logout"]', { timeout: 60000 })
        await pagina.click('button[id="logout"]')
        await pagina.waitForTimeout(5000)

        // Capturando o email do cryptogmail
        logs.push(`perfil ${identificador} - ` + 'Capturando o email')
        const email = await pagina.evaluate(()=>{
            return document.querySelector('[id="DontUseWEBuseAPI"]').value
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