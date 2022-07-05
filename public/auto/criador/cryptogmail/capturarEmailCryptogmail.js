const capturarEmailCryptogmail = async(x, pagina)=>{
    try{
        // Acessando o cryptogmail
        global.criador.push('Capturando o email')
        global.criador.push(`Perfil ${x} - ` + 'Acessando o cryptogmail')
        await pagina.bringToFront()
        await pagina.goto('https://cryptogmail.com/')

        // Esperando o botão de remover aparecer e clicando
        global.criador.push(`Perfil ${x} - ` + 'Atualizando o email')
        await pagina.waitForSelector('a[onclick="_temp_mail.removeEmailBox()"]')
        await pagina.click('a[onclick="_temp_mail.removeEmailBox()"]')
        await pagina.waitForTimeout(5000)

        // Capturando o email do cryptogmail
        global.criador.push(`Perfil ${x} - ` + 'Capturando o email')
        const email = await pagina.evaluate(()=>{
            return document.querySelector('.field--value.js-email').innerText
        })

        global.criador.push(`Perfil ${x} - ` + 'Email capturado com sucesso!')

        // Retornando o email
        return {
            ok: true,
            email: email
        }

    }catch(erro){
        console.log(erro.message)
        global.criador.push(`Perfil ${x} - ` + 'Erro ao tentar capturar o email.')
        return {
            ok: false
        }
    }
}

module.exports = capturarEmailCryptogmail