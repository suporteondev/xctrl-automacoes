const puppeteer = require('puppeteer-core')
const acessarGanharNoInsta = require('./gni/acessar')
const removerPerfisGni = require('./gni/removerPerfis')
const verInformacoesGni = require('./gni/verInformacoes')

const removedor = async(
    caminhoNavegador,
    modoInvisivelConfigurado,
    modoAnonimoConfigurado,
    userAgent,
    emailPlataforma,
    senhaPlataforma,
    tipoAcao
)=>{

    let navegador, pagina, context

    // CONFIGURANDO O NAVEGADOR
    navegador = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: modoInvisivelConfigurado,
        executablePath: caminhoNavegador,
        args: [
            '--no-sandbox',
            '--disabled-setuid-sandbox',
        ],
        defaultViewport: {
            width: 320,
            height: 580
        },
    })

    // CONFIGURANDO O MODO ANÔNIMO
    if(modoAnonimoConfigurado == true){
        context = await navegador.createIncognitoBrowserContext()
        pagina = await context.newPage()
        const paginas = await navegador.pages()
        await paginas[0].close()
    }else{
        const paginas = await navegador.pages()
        pagina = paginas[0]
    }

    // CONFIGURANDO O USER AGENT
    await pagina.setCacheEnabled(false)
    await pagina.setUserAgent(userAgent)
    await pagina.setExtraHTTPHeaders({
        'Accept-Language': 'pt-br'
    })

    // ACESSANDO O GANHAR NO INSTA
    const resultado = await acessarGanharNoInsta(pagina, emailPlataforma, senhaPlataforma)
    if(resultado == false){
        await navegador.close()
        global.removedor.push('O robô terminou, pode voltar!')
        return true
    }

    // VENDO INFORMAÇÕES
    if(tipoAcao == 'ver'){
        await verInformacoesGni(pagina)
    }

    if(tipoAcao == 'remover'){
        await removerPerfisGni(pagina)
    }

    await navegador.close()
    global.removedor.push('O robô terminou, pode voltar!')
}

module.exports = removedor