async function limpandoLogin(pagina, x, logs){
    try{
        // Limpando atividade de login
        logs.push('Limpando atividade de login')
        logs.push(`perfil ${x} - Acessando configurações`)
        await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })
        logs.push(`perfil ${x} - Esperando carregar`)
        await pagina.waitForSelector('._abl-', { timeout: 60000 })
        logs.push(`perfil ${x} - Apagando o login`)
        await pagina.click('._abl-')
        await pagina.waitForTimeout(2000)
        await pagina.evaluate(()=>{
            const botoes = document.querySelectorAll('button')
            botoes.forEach((botao)=>{
                if(botao.innerText == 'Sair'){
                    botao.click()
                }
            })
        })
        logs.push(`perfil ${x} - Login limpo com sucesso!`)

        return true
    }catch(erro){
        logs.push(`perfil ${x} - Erro ao tentar limpar o login`)
        logs.push(`perfil ${x} - Vamos tentar novamente!`)
        // Limpando atividade de login
        logs.push('Limpando atividade de login')
        logs.push(`perfil ${x} - Acessando configurações`)
        await pagina.goto('https://www.instagram.com/session/login_activity/', { timeout: 60000 })
        logs.push(`perfil ${x} - Esperando carregar`)
        await pagina.waitForSelector('._abl-', { timeout: 60000 })
        logs.push(`perfil ${x} - Apagando o login`)
        await pagina.click('._abl-')
        await pagina.waitForTimeout(2000)
        await pagina.evaluate(()=>{
            const botoes = document.querySelectorAll('button')
            botoes.forEach((botao)=>{
                if(botao.innerText == 'Sair'){
                    botao.click()
                }
            })
        })
        logs.push(`${x} - Login limpo com sucesso!`)
        return true
    }
}

module.exports = limpandoLogin