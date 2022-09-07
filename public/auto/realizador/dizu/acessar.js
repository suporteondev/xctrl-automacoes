const acessarDIZU = async(pagina, email, senha, logs)=>{
    try{

        logs.push('Acessando a DIZU')

        // TRAZENDO A PÁGINA PARA FRENTE
        await pagina.bringToFront()

        // ACESSANDO O GNI
        logs.push('Acessando a plataforma')
        await pagina.goto('https://painel.dizu.com.br/login')

        // DIGITANDO O EMAIL
        logs.push('Digitando o email')
        await pagina.waitForSelector('[name="login"]')
        await pagina.type('[name="login"]', email)

        // DIGITANDO A SENHA
        logs.push('Digitando a senha')
        await pagina.waitForSelector('[name="senha"]')
        await pagina.type('[name="senha"]', senha)

        // APERTANDO EM ENTRAR
        logs.push('Entrando na plataforma')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')

        // ESPERANDO CARREGAR
        logs.push('Esperando carregar')
        await pagina.waitForSelector('[id="formNotificacoes"]')

        logs.push(`Plataforma acessada com sucesso!`)

        return true

    }catch(erro){
        console.log(erro.message)

        logs.push(`Não conseguimos acessar a plataforma!`)
        
        return false
    }
}

module.exports = acessarDIZU