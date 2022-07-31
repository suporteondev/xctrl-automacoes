const limparAtividadeLogin = async(pagina, usuario, logs)=>{
    try{

        // Verificando quantos logins possuem
        logs.push('Limpando atividade de login')
        logs.push(`${usuario} - Acessando configurações`)
        await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

        logs.push(`${usuario} - Esperando carregar`)
        await pagina.waitForSelector('._abl-', { timeout: 60000 })
        logs.push(`${usuario} - Verificando quantas atividades de login o perfil possui`)
        const quantidadeLogins = await pagina.evaluate(()=>{
            return Number(document.querySelectorAll('._abl-').length)
        })
        logs.push(`${usuario} - Foram encontradas ${quantidadeLogins} atividades de login`)

        // LIMPANDO ATIVIDADE DE LOGIN
        for (let x = 0; x < quantidadeLogins; x++){

            const quantidadeLogins2 = await pagina.evaluate(()=>{
                return Number(document.querySelectorAll('._abl-').length)
            })
            
            logs.push(`${usuario} - Limpando a ${quantidadeLogins2}º atividade de login`)
            await pagina.evaluate((quantidadeLogins2)=>{
                document.querySelectorAll('._abl-')[quantidadeLogins2 - 1].click()
            }, quantidadeLogins2)

            await pagina.waitForTimeout(2000)
            logs.push(`${usuario} - Apertando em sair!`)
            await pagina.evaluate(()=>{
                const botoes = document.querySelectorAll('button')
                botoes.forEach((botao)=>{
                    if(botao.innerText == 'Sair'){
                        botao.click()
                    }
                })
            })
            
            await pagina.waitForSelector('button._a9--._a9_1', { timeout: 60000 })
            await pagina.click('button._a9--._a9_1')
            logs.push(`${usuario} - Atividade de login limpa com sucesso!`)
            await pagina.waitForTimeout(5000)
        }

        return true 
    }catch(erro){
        try{
            console.log(erro.message)
            logs.push(usuario + ' - Não conseguimos limpar a atividade de login desse perfil, mas iremos tentar novamente.')
            // Verificando quantos logins possuem
            logs.push('Limpando atividade de login')
            logs.push(`${usuario} - Acessando configurações`)
            await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
                await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }

            logs.push(`${usuario} - Esperando carregar`)
            await pagina.waitForSelector('._abl-', { timeout: 60000 })
            logs.push(`${usuario} - Verificando quantas atividades de login o perfil possui`)
            const quantidadeLogins = await pagina.evaluate(()=>{
                return Number(document.querySelectorAll('._abl-').length)
            })
            logs.push(`${usuario} - Foram encontradas ${quantidadeLogins} atividades de login`)

            // LIMPANDO ATIVIDADE DE LOGIN
            for (let x = 0; x < quantidadeLogins; x++){

                const quantidadeLogins2 = await pagina.evaluate(()=>{
                    return Number(document.querySelectorAll('._abl-').length)
                })
                
                logs.push(`${usuario} - Limpando a ${quantidadeLogins2}º atividade de login`)
                await pagina.evaluate((quantidadeLogins2)=>{
                    document.querySelectorAll('._abl-')[quantidadeLogins2 - 1].click()
                }, quantidadeLogins2)

                await pagina.waitForTimeout(2000)
                logs.push(`${usuario} - Apertando em sair!`)
                await pagina.evaluate(()=>{
                    const botoes = document.querySelectorAll('button')
                    botoes.forEach((botao)=>{
                        if(botao.innerText == 'Sair'){
                            botao.click()
                        }
                    })
                })
                
                await pagina.waitForSelector('button._a9--._a9_1', { timeout: 60000 })
                await pagina.click('button._a9--._a9_1')
                logs.push(`${usuario} - Atividade de login limpa com sucesso!`)
                await pagina.waitForTimeout(5000)
            }

            return true 
        }catch(erro){
            console.log(erro.message)
            logs.push(usuario + ' - Erro ao tentar limpar a atividade de login!')
            return false
        }

    }
}

module.exports = limparAtividadeLogin