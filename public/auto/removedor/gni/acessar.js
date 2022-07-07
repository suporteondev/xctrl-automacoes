let contador = 1

const acessarGanharNoInsta = async(pagina, email, senha)=>{
    try{

        global.removedor.push('Acessando a plataforma')
        await pagina.goto('https://www.ganharnoinsta.com/painel/', { timeout: 60000 })

        global.removedor.push('Digitando o email')
        await pagina.waitForSelector('input[name="email"]', { timeout: 60000 })
        await pagina.type('input[name="email"]', email)

        global.removedor.push('Digitando a senha')
        await pagina.waitForSelector('input[name="senha"]', { timeout: 60000 })
        await pagina.type('input[name="senha"]', senha)

        global.removedor.push('Apertando em entrar')
        await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
        await pagina.click('button[type="submit"]')

        global.removedor.push('Esperando a página carregar')
        await pagina.waitForNavigation({ timeout: 60000 })

        global.removedor.push('Plataforma acessada com sucesso!')
        return true

    }catch(erro){

        console.log(erro.message)
        contador++

        if(contador == 3){
            global.removedor.push('Não conseguimos acessar a plataforma!')
            contador = 0
            return false
        }else{
            global.removedor.push('Não conseguimos acessar a plataforma, mas vamos tentar acessar novamente!')
            await acessarGanharNoInsta(pagina, email, senha)
        }

        global.removedor.push('Não conseguimos acessar a plataforma!')
        return false
    }
}

module.exports = acessarGanharNoInsta