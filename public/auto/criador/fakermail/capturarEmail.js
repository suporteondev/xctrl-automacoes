const capturarEmail = async(identificador, pagina, logs)=>{
    try{
        // Acessando o cryptogmail
        logs.push('Capturando o email')
        await pagina.bringToFront()
        logs.push(`perfil ${identificador} - ` + 'Acessando o fakermail')
        await pagina.goto('https://fakermail.com/', { timeout: 60000 })

        // Esperando o botão de remover aparecer e clicando
        logs.push(`perfil ${identificador} - ` + 'Atualizando o email')
        await pagina.waitForSelector('[d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"]', { timeout: 60000 })
        await pagina.click('[d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"]')
        await pagina.waitForSelector('[id="email-address"]', { timeout: 60000 })
        await pagina.waitForTimeout(2000)

        // Capturando o email do cryptogmail
        logs.push(`perfil ${identificador} - ` + 'Capturando o email')
        const email = await pagina.evaluate(()=>{
            return document.querySelector('[id="email-address"]').value
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