const procurarBloqueios = require("./procurarBloqueios")

const limparAtividadeLogin = async(pagina, usuario, logs)=>{
    try{

        // Verificando quantos logins possuem
        logs.push('Limpando atividade de login')
        const bloqueio3 = await procurarBloqueios(pagina, usuario, logs)
        if(bloqueio3 == true){ return false }
        logs.push(`${usuario} - Acessando configurações`)
        await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })

        logs.push(`${usuario} - Esperando carregar`)
        await pagina.waitForSelector('._abl-', { timeout: 60000 })
        logs.push(`${usuario} - Verificando quantas atividades de login o perfil possui`)
        const quantidadeLogins = await pagina.evaluate(()=>{
            return Number(document.querySelectorAll('._abl-').length)
        })
        logs.push(`${usuario} - Foram encontradas ${quantidadeLogins} atividades de login`)

        // LIMPANDO ATIVIDADE DE LOGIN
        for (let x = 0; x < quantidadeLogins; x++){

            const bloqueio = await procurarBloqueios(pagina, usuario, logs)
            if(bloqueio == true){ break }

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
            const bloqueio4 = await procurarBloqueios(pagina, usuario, logs)
            if(bloqueio4 == true){ return false }
            logs.push(`${usuario} - Acessando configurações`)
            await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })

            logs.push(`${usuario} - Esperando carregar`)
            await pagina.waitForSelector('._abl-', { timeout: 60000 })
            logs.push(`${usuario} - Verificando quantas atividades de login o perfil possui`)
            const quantidadeLogins = await pagina.evaluate(()=>{
                return Number(document.querySelectorAll('._abl-').length)
            })
            logs.push(`${usuario} - Foram encontradas ${quantidadeLogins} atividades de login`)

            // LIMPANDO ATIVIDADE DE LOGIN
            for (let x = 0; x < quantidadeLogins; x++){

                const bloqueio2 = await procurarBloqueios(pagina, usuario, logs)
                if(bloqueio2 == true){ break }

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