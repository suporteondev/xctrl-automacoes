const acessarGni = async(pagina, email, senha, logs)=>{
    try{

        logs.push('Acessando o Ganhar nas Redes')

        // TRAZENDO A PÁGINA PARA FRENTE
        await pagina.bringToFront()

        // ACESSANDO O GNI
        logs.push('Acessando a plataforma')
        await pagina.goto('https://www.ganharnasredes.com/painel/')

        // FECHANDO O ALERTA DO GANHAR NAS REDES
        logs.push('Fechando o alerta')
        await pagina.waitForSelector('.close')
        await pagina.click('.close')

        // DIGITANDO O EMAIL
        logs.push('Digitando o email')
        await pagina.waitForSelector('[name="email"]')
        await pagina.type('[name="email"]', email)

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
        await pagina.waitForSelector('[href="/painel/?pagina=sistema"]')

        logs.push(`Plataforma acessada com sucesso!`)

        return true

    }catch(erro){
        console.log(erro.message)

        logs.push(`Não conseguimos acessar a plataforma!`)
        
        return false
    }
}

module.exports = acessarGni