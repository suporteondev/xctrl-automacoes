const seguirPerfisFamosos = async(pagina, usuario, seguirPerfis, esperarEntre, logs)=>{
    try{

        logs.push(`Seguindo perfis`)
        
        // Acessando o instagram do famoso
        logs.push(`${usuario} - Acessando o perfil do famoso`)
        await pagina.goto('https://www.instagram.com/othiagoventura/', { timeout: 60000 })

        // Vendo os seguidores do famoso
        logs.push(`${usuario} - Vendo os seguidores do famoso`)
        await pagina.waitForSelector('._aa_6:nth-child(2)', { timeout: 60000 })
        await pagina.click('._aa_6:nth-child(2)')
        
        // Esperando carregar
        logs.push(`${usuario} - Esperando carregar`)
        await pagina.waitForSelector('._aanp._aaey', { timeout: 60000 })

        // Seguindo os perfis
        for(let x = 0; x < seguirPerfis; x++){
            try{
                logs.push(`${usuario} - Seguindo o ${x + 1}º perfil`)
                await pagina.waitForSelector('._acan._acap._acas', { timeout: 60000 })
                await pagina.click('._acan._acap._acas')
                await pagina.waitForTimeout(2000)
                logs.push(`${usuario} - Perfil seguido com sucesso!`)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }catch(erro){
                logs.push(`${usuario} - Não conseguimos seguir o ${x + 1}º perfil, mas iremos tentar novamente!`)
                logs.push(`${usuario} - Seguindo o ${x + 1}º perfil`)
                await pagina.waitForSelector('._acan._acap._acas', { timeout: 60000 })
                await pagina.click('._acan._acap._acas')
                await pagina.waitForTimeout(2000)
                logs.push(`${usuario} - Perfil seguido com sucesso!`)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }
        }

        return true 
    }catch(erro){
        try{
            console.log(erro.message)
            logs.push(usuario + ' - Não conseguimos seguir os perfis, mas iremos tentar novamente.')
            logs.push(`Seguindo perfis`)
            
            // Acessando o instagram do famoso
            logs.push(`${usuario} - Acessando o perfil do famoso`)
            await pagina.goto('https://www.instagram.com/othiagoventura/', { timeout: 60000 })

            // Vendo os seguidores do famoso
            logs.push(`${usuario} - Vendo os seguidores do famoso`)
            await pagina.waitForSelector('._aa_6:nth-child(2)', { timeout: 60000 })
            await pagina.click('._aa_6:nth-child(2)')
            
            // Esperando carregar
            logs.push(`${usuario} - Esperando carregar`)
            await pagina.waitForSelector('._aanp._aaey', { timeout: 60000 })

            // Seguindo os perfis
            for(let x = 0; x < seguirPerfis; x++){
                try{
                    logs.push(`${usuario} - Seguindo o ${x + 1}º perfil`)
                    await pagina.waitForSelector('._acan._acap._acas', { timeout: 60000 })
                    await pagina.click('._acan._acap._acas')
                    await pagina.waitForTimeout(2000)
                    logs.push(`${usuario} - Perfil seguido com sucesso!`)
                }catch(erro){
                    logs.push(`${usuario} - Não conseguimos seguir o ${x + 1}º perfil, mas iremos tentar novamente!`)
                    logs.push(`${usuario} - Seguindo o ${x + 1}º perfil`)
                    await pagina.waitForSelector('._acan._acap._acas', { timeout: 60000 })
                    await pagina.click('._acan._acap._acas')
                    await pagina.waitForTimeout(2000)
                    logs.push(`${usuario} - Perfil seguido com sucesso!`)
                }
            }

            return true
        }catch(erro){
            console.log(erro.message)
            logs.push(usuario + ' - Erro ao tentar seguir os perfis!')
            return false
        } 
    }
}

module.exports = seguirPerfisFamosos