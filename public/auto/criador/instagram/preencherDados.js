const atalhos = require('../atalhos')
const { pessoa } = require('gerador')

const preencherDados = async(identificador, pagina, email, senha, genero, logs)=>{
    try{

        // Acessar instagram
        logs.push('Preenchendo dados')
        await pagina.bringToFront()
        await pagina.goto('https://www.instagram.com/accounts/emailsignup/', { timeout: 60000 })

        const erroInicial = await pagina.evaluate(()=>{
            const titulos = document.querySelectorAll('h2')

            for(let x = 0; x < titulos.length; x++) {
                const titulo = titulos[x]
                if(titulo.innerText == 'Erro'){
                    return true
                }else{
                    return false
                }
            }
        })

        if(erroInicial == true){
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)
            await pagina.goto('https://www.instagram.com/accounts/emailsignup/', { timeout: 60000 })
        }
        
        try{
            logs.push(`perfil ${identificador} - ` + 'Aceitando os cookies')
            await pagina.waitForSelector('.aOOlW.bIiDR', { timeout: 5000 })
            await pagina.click('.aOOlW.bIiDR') 
            logs.push(`perfil ${identificador} - ` + 'Limpando os cookies')
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)
        }catch(erro){
            
        }

        // Preenchendo o email temporário
        logs.push(`perfil ${identificador} - ` + 'Digitando 0 no email')
        await atalhos.escrever(pagina, 'input[name="emailOrPhone"]', '0')
       
        // Preenchendo o nome
        logs.push(`perfil ${identificador} - ` + 'Preenchendo o nome')

        const nomeFeminino = `${pessoa.nomeFeminino()} ${pessoa.nomeFeminino()} ${pessoa.nomeFeminino()}`
        const nomeMasculino = `${pessoa.nomeMasculino()} ${pessoa.nomeMasculino()} ${pessoa.nomeMasculino()}`
        let nomeEscolhido = ''

        if(genero == 'feminino'){
            await atalhos.escrever(pagina, 'input[name="fullName"]', nomeFeminino)
            nomeEscolhido = nomeFeminino
        }else if(genero == 'masculino'){
            await atalhos.escrever(pagina, 'input[name="fullName"]', nomeMasculino)
            nomeEscolhido = nomeMasculino
        }

        // Preenchendo o usuário
        logs.push(`perfil ${identificador} - ` + 'Selecionando um usuário aleatório')
        await atalhos.clicar(pagina, 'input[name="username"]')
        
        try{
            await pagina.waitForSelector('span.coreSpriteInputRefresh', { timeout: 5000 })
            await pagina.click('span.coreSpriteInputRefresh')
        }catch(erro){
            throw new Error('Erro')
        }
        
        // Capturando o nome de usuário
        logs.push(`perfil ${identificador} - ` + 'Capturando o usuário')
        const usuario = await pagina.evaluate(()=>{
            return document.querySelector('input[name="username"]').value
        })

        // Preenchendo o email fixo
        logs.push(`perfil ${identificador} - ` + 'Preenchendo o email fixo')
        await atalhos.clicar(pagina, 'input[name="emailOrPhone"]')
        await atalhos.selecionarTudo(pagina)
        await atalhos.escrever(pagina, 'input[name="emailOrPhone"]', email)

        // Preenchendo a senha
        logs.push(`perfil ${identificador} - ` + 'Preenchendo a senha')
        await atalhos.escrever(pagina, 'input[name="password"]', senha)

        // Avançando
        logs.push(`perfil ${identificador} - ` + 'Avançando')
        await atalhos.clicar(pagina, 'button[type="submit"]')

        // Esperando avançar
        await pagina.waitForSelector('[title="Mês:"]', { timeout: 60000 })
        logs.push(`perfil ${identificador} - ` + 'Dados preenchidos com sucesso!')

        return {
            ok: true,
            usuario: usuario
        }

    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar preencher os dados.')
        return {
            ok: false
        }
    }
}

module.exports = preencherDados