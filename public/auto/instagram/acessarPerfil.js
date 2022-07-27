const acessarPerfil = async(pagina, usuario, senha, logs)=>{
    try{

        logs.push('Acessando o instagram')
        await pagina.goto('https://www.instagram.com/accounts/login/')

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K', { timeout: 10000 })
            await pagina.click('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

        logs.push(usuario + ' - Digitando usuário.')
        await pagina.waitForSelector('input[name="username"]')
        await pagina.type('input[name="username"]', usuario)

        logs.push(usuario + ' - Digitando senha.')
        await pagina.waitForSelector('input[name="password"]')
        await pagina.type('input[name="password"]', senha)

        logs.push(usuario + ' - Entrando no perfil.')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')

        logs.push(usuario + ' - Esperando carregar.')
        await pagina.waitForNavigation()

        // Apertando em agora não
        await pagina.waitForSelector('.cmbtv > button')
        await pagina.click('.cmbtv > button')

        // Esperando o direct aparecer
        try{
            await pagina.waitForSelector('[aria-label="Direct"]') 
        }catch(erro){
            await pagina.waitForSelector('[aria-label="Messenger"]')
        }
        
        // Retornando o sucesso
        logs.push(`${usuario} - Perfil acessado com sucesso!`)

        return true

    }catch(erro){
        console.log(erro.message)
        try{
            logs.push(usuario + ' - Não conseguimos acessar o perfil, mas iremos tentar novamente.')
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)

            logs.push('Acessando o instagram')
            await pagina.goto('https://www.instagram.com/accounts/login/')

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K', { timeout: 10000 })
                await pagina.click('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }

            logs.push(usuario + ' - Digitando usuário.')
            await pagina.waitForSelector('input[name="username"]')
            await pagina.type('input[name="username"]', usuario)

            logs.push(usuario + ' - Digitando senha.')
            await pagina.waitForSelector('input[name="password"]')
            await pagina.type('input[name="password"]', senha)

            logs.push(usuario + ' - Entrando no perfil.')
            await pagina.waitForSelector('button[type="submit"]')
            await pagina.click('button[type="submit"]')

            logs.push(usuario + ' - Esperando carregar.')
            await pagina.waitForNavigation()

            // Apertando em agora não
            await pagina.waitForSelector('.cmbtv > button')
            await pagina.click('.cmbtv > button')

            // Esperando o direct aparecer
            try{
                await pagina.waitForSelector('[aria-label="Direct"]') 
            }catch(erro){
                await pagina.waitForSelector('[aria-label="Messenger"]')
            }
            
            // Retornando o sucesso
            logs.push(`${usuario} - Perfil acessado com sucesso!`)

            return true
        }catch(erro){
            logs.push(usuario + ' - Erro ao tentar acessar o perfil!')
            return false
        }
    }
}

module.exports = acessarPerfil