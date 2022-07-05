const atalhos = require('../atalhos')
const { pessoa } = require('gerador')

const preencherDados = async(x, pagina, email, senha, genero)=>{
    try{

        // Acessar instagram
        global.criador.push('Preenchendo dados')
        await pagina.bringToFront()
        await pagina.goto('https://www.instagram.com/accounts/emailsignup/')

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
            await pagina.goto('https://www.instagram.com/accounts/emailsignup/')
        }
        
        try{
            global.criador.push(`Perfil ${x} - ` + 'Aceitando os cookies')
            await pagina.waitForSelector('.aOOlW.bIiDR', { timeout: 5000 })
            await pagina.click('.aOOlW.bIiDR') 
            global.criador.push(`Perfil ${x} - ` + 'Limpando os cookies')
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)
        }catch(erro){
            
        }

        // Preenchendo o email temporário
        global.criador.push(`Perfil ${x} - ` + 'Digitando 0 no email')
        await atalhos.escrever(pagina, 'input[name="emailOrPhone"]', '0')
       
        // Preenchendo o nome
        global.criador.push(`Perfil ${x} - ` + 'Preenchendo o nome')

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
        global.criador.push(`Perfil ${x} - ` + 'Selecionando um usuário aleatório')
        await atalhos.clicar(pagina, 'input[name="username"]')
        
        try{
            await pagina.waitForSelector('span.coreSpriteInputRefresh', { timeout: 5000 })
            await pagina.click('span.coreSpriteInputRefresh')
        }catch(erro){
            throw new Error('Erro')
        }
        
        // Capturando o nome de usuário
        global.criador.push(`Perfil ${x} - ` + 'Capturando o usuário')
        const usuario = await pagina.evaluate(()=>{
            return document.querySelector('input[name="username"]').value
        })

        // Preenchendo o email fixo
        global.criador.push(`Perfil ${x} - ` + 'Preenchendo o email fixo')
        await atalhos.clicar(pagina, 'input[name="emailOrPhone"]')
        await atalhos.selecionarTudo(pagina)
        await atalhos.escrever(pagina, 'input[name="emailOrPhone"]', email)

        // Preenchendo a senha
        global.criador.push(`Perfil ${x} - ` + 'Preenchendo a senha')
        await atalhos.escrever(pagina, 'input[name="password"]', senha)

        // Avançando
        global.criador.push(`Perfil ${x} - ` + 'Avançando')
        await atalhos.clicar(pagina, 'button[type="submit"]')

        // Esperando avançar
        await pagina.waitForSelector('[title="Mês:"]')
        global.criador.push(`Perfil ${x} - ` + 'Dados preenchidos com sucesso!')

        return {
            ok: true,
            usuario: usuario
        }

    }catch(erro){
        if(erro.message != 'Erro'){
            global.criador.push(`Perfil ${x} - ` + 'Erro ao tentar preencher os dados.')
        }
        return {
            ok: false
        }
    }
}

module.exports = preencherDados