// Acessar perfil
const acessarPerfil = async(pagina, usuario, senha, logs)=>{
    try{

        // Acessar o instagram
        logs.push('')
        logs.push('Acessando o instagram')
        await pagina.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 })

        logs.push(usuario + ' - Limpando os cookies.')
        const cookies = await pagina.cookies()
        await pagina.deleteCookie(...cookies)

        // Digitando o usuário
        logs.push(usuario + ' - Digitando usuário.')
        await pagina.waitForSelector('input[name="username"]')
        await pagina.type('input[name="username"]', usuario)

        // Digitando a senha
        logs.push(usuario + ' - Digitando senha.')
        await pagina.waitForSelector('input[name="password"]')
        await pagina.type('input[name="password"]', senha)

        // Fazendo login
        logs.push(usuario + ' - Entrando no perfil.')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')
        
        // Esperando a página carregar
        logs.push(usuario + ' - Esperando carregar.')
        await pagina.waitForNavigation({ timeout: 60000 })

        // Apertando em agora não
        await pagina.waitForSelector('.cmbtv > button', { timeout: 60000 })
        await pagina.click('.cmbtv > button')

        // Esperando o direct aparecer
        await pagina.waitForSelector('[aria-label="Direct"]', { timeout: 60000 })

        // Retornando o sucesso
        logs.push(`${usuario} - Perfil acessado com sucesso!`)

        return true

    }catch(erro){
        console.log(erro.message)
        logs.push(usuario + ' - Não conseguimos acessar esse perfil!')
        return false
    }
}

module.exports = acessarPerfil