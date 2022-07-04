const acessarGanharNoInsta = async(pagina, email, senha)=>{
    try{

        global.removedor.push('Acessando a plataforma')
        await pagina.goto('https://www.ganharnoinsta.com/painel/')

        global.removedor.push('Digitando o email')
        await pagina.waitForSelector('input[name="email"]')
        await pagina.type('input[name="email"]', email)

        global.removedor.push('Digitando a senha')
        await pagina.waitForSelector('input[name="senha"]')
        await pagina.type('input[name="senha"]', senha)

        global.removedor.push('Apertando em entrar')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')

        global.removedor.push('Esperando a página carregar')
        await pagina.waitForNavigation()

        global.removedor.push('Plataforma acessada com sucesso!')
        return true

    }catch(erro){
        global.removedor.push('Não conseguimos acessar a plataforma!')
        return false
    }
}

module.exports = acessarGanharNoInsta