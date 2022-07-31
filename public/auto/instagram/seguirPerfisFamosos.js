const seguirPerfisFamosos = async(pagina, usuario, seguirPerfis, esperarEntre, logs)=>{
    try{

        logs.push(`Seguindo perfis sugeridos`)
        
        // Acessando o instagram do famoso
        logs.push(`${usuario} - Acessando o explorer`)
        await pagina.goto('https://www.instagram.com/explore/people/', { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

        // Esperando carregar
        logs.push(`${usuario} - Esperando carregar`)

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
                logs.push(`${usuario} - Não conseguimos seguir o ${x + 1}º perfil!`)
            }
        }

        return true 
    }catch(erro){
        logs.push(usuario + ' - Erro ao tentar seguir os perfis!')
        return false
    }
}

module.exports = seguirPerfisFamosos