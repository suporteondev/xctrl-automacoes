const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('./selecionarUserAgentAleatorio')

async function abrirNavegador(
    navegadorEscolhido,
    verAcontecendoConfigurado,
    modoAnonimo,
    userAgent,
    tipoUserAgent
){

    let navegador, context, pagina

    if(navegadorEscolhido == 'google'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }
    }else if(navegadorEscolhido == 'edge'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }
    }else if(navegadorEscolhido == 'brave'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendoConfigurado,
                executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ]
            })   
        }
    }

    // CONFIGURANDO O MODO ANÔNIMO
    if(modoAnonimo == true){
        context = await navegador.createIncognitoBrowserContext()
        pagina = await context.newPage()
        const paginas = await navegador.pages()
        await paginas[0].close()
    }else{
        const paginas = await navegador.pages()
        pagina = paginas[0]
    }

    // SELECIONANDO UM USER AGENT
    if(userAgent == 'aleatorio'){
        await selecionarUserAgentAleatorio(pagina, tipoUserAgent)
    }else{
        await pagina.setUserAgent(userAgent)
    }

    // ALTERANDO O TAMANHO DA PÁGINA
    if(tipoUserAgent == 'mobile'){
        await pagina.setViewport({
            width: 320,
            height: 580,
            deviceScaleFactor: 1
        })
    }else if(tipoUserAgent == 'desktop'){
        await pagina.setViewport({
            width: 800,
            height: 500,
            deviceScaleFactor: 1
        })
    }

    // ALTERANDO A LINGUAGEM DO NAVEGADOR
    await pagina.setExtraHTTPHeaders({
        'Accept-Language': 'pt-br'
    })

    return {
        navegador,
        pagina
    }
}

module.exports = abrirNavegador