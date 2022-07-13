const atalhos = require('../atalhos')

const acessarInstagram = async(pagina, usuario, senha, logs)=>{
    try{
        // Acessar o instagram
        logs.push('')
        logs.push('Acessando o instagram')
        await pagina.goto('https://www.instagram.com/accounts/login/')

        logs.push(usuario + ' - Deletando os cookies.')
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
        logs.push(usuario + ' - Acessando o instagram.')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')
        
        // Esperando a página carregar
        logs.push(usuario + ' - Esperando carregar.')
        await pagina.waitForNavigation()

        // Verificando se existe algum spam
        let spam = await pagina.evaluate(()=>{

            let refsH2 = document.querySelectorAll('h2')

            for(let x = 0; x < refsH2.length; x++){

                // Capturando o H2
                const elemento = refsH2[x]

                // Verificando se ocorreu algum SPAM
                if(elemento.innerText == 'Sua publicação vai contra nossas Diretrizes da Comunidade'){
                    return true
                }else{
                    return false
                }
            }
        })

        if(spam == true){
            // Clicando no botão do spam
            await pagina.evaluate(()=>{
                document.querySelectorAll('button').forEach((e)=>{
                    if(e.innerText == 'OK'){
                        e.click()
                    }
                })
            })

            await pagina.waitForTimeout(5000)
        }

        // Apertando em agora não
        await pagina.waitForSelector('.cmbtv > button')
        await pagina.click('.cmbtv > button')

        // Esperando o direct aparecer
        await pagina.waitForSelector('[aria-label="Direct"]')

        // Retornando o sucesso
        logs.push(`${usuario} - Perfil acessado com sucesso!`)

        // Retornando sucesso
        return true   
    }catch(erro){
        logs.push(`${usuario} - Não conseguimos acessar esse perfil!`)
        return false
    }
}

module.exports = acessarInstagram