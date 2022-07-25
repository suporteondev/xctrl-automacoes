// Imports do sistema
const puppeteer = require('puppeteer-core')
const UserAgent = require("user-agents")
const Store = require('electron-store')
const store = new Store()
const fs = require('fs')
var pastaEscolhida = []

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
const alterarFotoPerfil = require('./instagram/alterarFotoPerfil')
const alterarBiografiaPerfil = require('./instagram/alterarBiografiaPerfil')
const realizarPublicacoesFeed = require('./instagram/realizarPublicacoesFeed')
const limparAtividadeLogin = require('./instagram/limparAtividadeLogin')

// Iniciando a criação
const criador = async(
    caminhoNavegador, 
    modoInvisivelConfigurado,
    modoAnonimoConfigurado,
    generoPerfis, 
    senhaPerfis, 
    limparLoginConfigurado,
    comoSalvar,
    ondeSalvar,
    quantidadePerfis, 
    emailTemporario,
    esperarEntreConfigurado,
    montarPerfisConfigurado,
    logs
)=>{

    for(let x = 1; x < (Number(quantidadePerfis) + 1); x++){

        let context, paginaEmail, paginaInstagram

        // Criando o navegador
        const navegador = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: modoInvisivelConfigurado,
            executablePath: caminhoNavegador,
            args: [
                '--no-sandbox',
                '--disabled-setuid-sandbox',
            ]
        })

        if(modoAnonimoConfigurado == true){
            context = await navegador.createIncognitoBrowserContext()
            paginaEmail = await context.newPage()
            const paginas = await navegador.pages()
            await paginas[0].close()
        }else{
            const paginas = await navegador.pages()
            paginaEmail = paginas[0]
        }

        // User agents
        const { userAgent } = new UserAgent({ deviceCategory: "desktop" })
        await paginaEmail.setUserAgent(userAgent)
        await paginaEmail.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // Capturando email no paginaEmail
        let resEmail
        if(emailTemporario == 'cryptogmail'){
            resEmail = await capturarEmail(x, paginaEmail, logs)
        }else if(emailTemporario == 'mailtm'){
            resEmail = await capturarEmailTM(x, paginaEmail, logs)
        }else if(emailTemporario == 'fakermail'){
            resEmail = await capturarEmailFakermail(x, paginaEmail, logs)
        }

        if(resEmail.ok == false){
            await navegador.close()
            continue
        }

        // Email capturado com sucesso
        const { email } = resEmail

        if(modoAnonimoConfigurado == true){
            paginaInstagram = await context.newPage()
        }else{
            paginaInstagram = await navegador.newPage()
        }

        await paginaInstagram.setUserAgent(userAgent)
        await paginaInstagram.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // Preenchendo os dados no instagram
        const resPreencher = await preencherDados(x, paginaInstagram, email, senhaPerfis, generoPerfis, logs)
        if(resPreencher.ok == false){
            await navegador.close()
            continue
        }

        // Usuário capturado com sucesso
        const { usuario } = resPreencher

        // Selecionando a data do perfil
        const resData = await selecionarData(x, paginaInstagram, logs)
        if(resData.ok == false){
            await navegador.close()
            continue
        }

        // Capturando código
        let resCodigo

        if(emailTemporario == 'cryptogmail'){
            resCodigo = await capturarCodigo(x, paginaEmail, logs)
        }else if(emailTemporario == 'mailtm'){
            resCodigo = await capturarCodigoTM(x, paginaEmail, logs)
        }else if(emailTemporario == 'fakermail'){
            resCodigo = await capturarCodigoFakermail(x, paginaEmail, logs)
        }

        if(resCodigo.ok == false){
            await navegador.close()
            continue
        }

        // Usuário capturado com sucesso
        const { codigo } = resCodigo
        
        // Preenchendo o código e verificando se tomou sms ou criou com sucesso
        const resDigitandoCodigo = await digitandoCodigo(
            x, 
            paginaInstagram, 
            comoSalvar,
            ondeSalvar,
            usuario, 
            senhaPerfis, 
            codigo, 
            limparLoginConfigurado,
            logs
        )

        if(resDigitandoCodigo.ok == false){
            await navegador.close()
            continue
        }

        if(montarPerfisConfigurado == false){
            if(limparLoginConfigurado == true){
                await limparAtividadeLogin(paginaInstagram, usuario, logs)
            }
        }

        if(montarPerfisConfigurado == true){

            await paginaInstagram.setViewport({
                width: 320,
                height: 580,
                deviceScaleFactor: 1
            })

            const listaDeUserAgentsMobile = new UserAgent({ deviceCategory: "mobile" })
            await paginaInstagram.setUserAgent(listaDeUserAgentsMobile.userAgent)

            const { 
                fotoPerfil, 
                pastaFotos,
                alterarBiografia,
                quantidadePublicacoes
            } = store.get('configuracoesMontador')

            // REALIZANDO A PUBLICAÇÃO
            const pastas = fs.readdirSync(pastaFotos)
            let caminhoPasta = ''

            async function selecionarCaminho(){
                pastaEscolhida.length == pastas.length ? pastaEscolhida = [] : ''
                caminhoPasta = `${pastaFotos}\\${pastas[Math.floor(Math.random() * pastas.length)]}`

                if(pastaEscolhida.indexOf(caminhoPasta) >=0){
                    return selecionarCaminho()
                }

                return pastaEscolhida.push(caminhoPasta)
            }

            await selecionarCaminho()
            
            // ALTERANDO A FOTO DE PERFIL
            if(fotoPerfil == 'sim'){
                await alterarFotoPerfil(paginaInstagram, usuario, caminhoPasta, logs)
            }

            // ALTERANDO A BIOGRAFIA
            if(alterarBiografia == 'sim'){
                await alterarBiografiaPerfil(paginaInstagram, usuario, generoPerfis, logs)
            }

            // REALIZANDO PUBLICAÇÕES NO FEED
            if(
                Number(quantidadePublicacoes) != 0 || 
                Number(quantidadePublicacoes) != '0' || 
                Number(quantidadePublicacoes) != ''
            ){
                logs.push(`Postando fotos no Feed`)
                await paginaInstagram.waitForTimeout(2000)
                const aceitarCookie = await paginaInstagram.evaluate(()=>{

                    let botoes = document.querySelectorAll('button')

                    for(let x = 0; x < botoes.length; x++){

                        // Capturando o H2
                        const botao = botoes[x]

                        // Verificando se ocorreu algum SPAM
                        if(botao.innerText == 'Permitir todos os cookies'){
                            return true
                        }else{
                            return false
                        }
                    }
                })

                if(aceitarCookie == true){
                    // Verificando se existe algum spam
                    logs.push(usuario + ' - Aceitando os cookies.')

                    await paginaInstagram.evaluate(()=>{
                        document.querySelectorAll('button').forEach((e)=>{
                            if(e.innerText == 'Permitir todos os cookies'){
                                e.click()
                            }
                        })
                    })
                    await paginaInstagram.waitForTimeout(5000)
                }
                for(let x = 0; x < Number(quantidadePublicacoes); x++){
                    await realizarPublicacoesFeed(paginaInstagram, x + 1 ,usuario, caminhoPasta, logs)
                }
            }

            if(limparLoginConfigurado == true){
                await limparAtividadeLogin(paginaInstagram, usuario, logs)
            }
        }

        if(esperarEntreConfigurado != 0){
            logs.push(`perfil ${x} - Aguardando ${esperarEntreConfigurado / 1000} segundos.`)
            await paginaInstagram.waitForTimeout(esperarEntreConfigurado)
        }

        // Fechando o navegador
        await navegador.close()
    }

    logs.push('O robô terminou, pode voltar!')
    return true
}

module.exports = criador