var contador = 1

const acessarPerfil = async(pagina, usuario, senha, logs)=>{
    try{

        // Acessar o instagram
        logs.push('')
        logs.push('Acessando o instagram')
        await pagina.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 })

        //aceitando os cookies
        try{
            await pagina.waitForSelector('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K', { timeout: 10000 })
            logs.push(usuario + ' - Aceitando os cookies.')
            await pagina.click('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

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

        contador = 1

        return true

    }catch(erro){
        if(contador == 3){
            logs.push(usuario + ' - Erro ao tentar acessar o perfil!')
            contador = 1
            return false
        }else{
            logs.push(usuario + ' - Não conseguimos acessar o perfil, mas iremos tentar novamente.')
            contador = contador + 1
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)
            await acessarPerfil(pagina, usuario, senha, logs)
        }
    }
}

module.exports = acessarPerfil