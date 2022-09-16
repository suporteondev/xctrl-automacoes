const procurarBloqueios = require("./procurarBloqueios")

const acessarPerfil = async(pagina, usuario, senha, logs)=>{
    try{

        logs.push('Acessando o instagram')
        await pagina.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 })

        logs.push(usuario + ' - Digitando usuário.')
        await pagina.waitForSelector('input[name="username"]', { timeout: 60000 })
        await pagina.type('input[name="username"]', usuario)

        logs.push(usuario + ' - Digitando senha.')
        await pagina.waitForSelector('input[name="password"]', { timeout: 60000 })
        await pagina.type('input[name="password"]', senha)

        logs.push(usuario + ' - Entrando no perfil.')
        await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
        await pagina.click('button[type="submit"]')

        logs.push(usuario + ' - Esperando carregar.')
        await pagina.waitForNavigation({ timeout: 60000 })

        await pagina.waitForTimeout(5000)
        const bloqueio = await procurarBloqueios(pagina, usuario, logs)
        if(bloqueio == true){ return false }

        // Apertando em agora não
        try{
            await pagina.waitForSelector('.cmbtv > button', { timeout: 10000 })
            await pagina.click('.cmbtv > button')
        }catch(erro){
            
        }

        // Esperando o direct aparecer
        await pagina.waitForSelector('[aria-label="Página inicial"]') 
        
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
            await pagina.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 })

            logs.push(usuario + ' - Digitando usuário.')
            await pagina.waitForSelector('input[name="username"]', { timeout: 60000 })
            await pagina.type('input[name="username"]', usuario)

            logs.push(usuario + ' - Digitando senha.')
            await pagina.waitForSelector('input[name="password"]', { timeout: 60000 })
            await pagina.type('input[name="password"]', senha)

            logs.push(usuario + ' - Entrando no perfil.')
            await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
            await pagina.click('button[type="submit"]')

            logs.push(usuario + ' - Esperando carregar.')
            await pagina.waitForNavigation({ timeout: 60000 })
            await pagina.waitForTimeout(5000)
            const bloqueio2 = await procurarBloqueios(pagina, usuario, logs)
            if(bloqueio2 == true){ return false }

            // Apertando em agora não
            try{
                await pagina.waitForSelector('.cmbtv > button', { timeout: 10000 })
                await pagina.click('.cmbtv > button')
            }catch(erro){
                
            }

            // Esperando o direct aparecer
            await pagina.waitForSelector('[aria-label="Página inicial"]') 
            
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