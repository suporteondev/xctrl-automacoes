// Imports do sistema
const puppeteer = require('puppeteer-core')
const UserAgent = require("user-agents")

// Ações
const capturarEmail = require('./cryptogmail/capturarEmail')
const capturarEmailTM = require('./mailtm/capturarEmail')
const capturarEmailFakermail = require('./fakermail/capturarEmail')
const preencherDados = require('./instagram/preencherDados')
const selecionarData = require('./instagram/selecionarData')
const capturarCodigo = require('./cryptogmail/capturarCodigo')
const capturarCodigoTM = require('./mailtm/capturarCodigo')
const capturarCodigoFakermail = require('./fakermail/capturarCodigo')
const digitandoCodigo = require('./instagram/digitandoCodigo')

// Gerando um userAgent aleatório
const { userAgent } = new UserAgent({ deviceCategory: "desktop", platform: "Win32" })

// Iniciando a criação
const criador = async(ref, caminho, genero, senha, quantidade, provedor, logs)=>{

    const arrayPerfis = []

    for(let x = 1; x < (Number(quantidade) + 1); x++){

        // Navegador
        const navegador = await puppeteer.launch({ 
            headless: true, 
            executablePath: caminho
        })

        // Capturando as paginas
        const paginas = await navegador.pages()
        const provedorEmail = paginas[0]

        // User agents
        await provedorEmail.setUserAgent(userAgent)

        // Capturando email no provedorEmail
        let resEmail
        if(provedor == 'cryptogmail'){
            resEmail = await capturarEmail(x, provedorEmail, logs)
        }else if(provedor == 'mailtm'){
            resEmail = await capturarEmailTM(x, provedorEmail, logs)
        }else if(provedor == 'fakermail'){
            resEmail = await capturarEmailFakermail(x, provedorEmail, logs)
        }

        if(resEmail.ok == false){
            await navegador.close()
            continue
        }

        // Email capturado com sucesso
        const { email } = resEmail

        // Abrindo uma página para manipular o instagram
        const instagram = await navegador.newPage()

        // Preenchendo os dados no instagram
        const resPreencher = await preencherDados(x, instagram, email, senha, genero, logs)
        if(resPreencher.ok == false){
            await navegador.close()
            continue
        }

        // Usuário capturado com sucesso
        const { usuario } = resPreencher

        // Selecionando a data do perfil
        const resData = await selecionarData(x, instagram, logs)
        if(resData.ok == false){
            await navegador.close()
            continue
        }

        // Capturando código
        let resCodigo

        if(provedor == 'cryptogmail'){
            resCodigo = await capturarCodigo(x, provedorEmail, logs)
        }else if(provedor == 'mailtm'){
            resCodigo = await capturarCodigoTM(x, provedorEmail, logs)
        }else if(provedor == 'fakermail'){
            resCodigo = await capturarCodigoFakermail(x, provedorEmail, logs)
        }

        if(resCodigo.ok == false){
            await navegador.close()
            continue
        }

        // Usuário capturado com sucesso
        const { codigo } = resCodigo
        
        // Preenchendo o código e verificando se tomou sms ou criou com sucesso
        const resDigitandoCodigo = await digitandoCodigo(ref, x, instagram, usuario, senha, codigo, logs)
        if(resDigitandoCodigo.ok == false){
            await navegador.close()
            continue
        }

        // Adicionando o usuário em um array
        arrayPerfis.push({
            usuario: usuario,
            senha: senha
        })

        await instagram.waitForTimeout(30000)

        // Fechando o navegador
        await navegador.close()
    }

    return arrayPerfis
}

module.exports = criador