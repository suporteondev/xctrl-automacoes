const puppeter = require('puppeteer-core')
const acessarGNI = require('./acessarGNI')
const removerPerfis = require('./removerPerfis')
const verPerfisDesativados = require('./verPerfisDesativados')

async function iniciar(caminho, visivelConfigurado, anonimoConfigurado, userAgent, acao, email, senha){

    let pagina, context

    const navegador = await puppeter.launch({ 
        headless: visivelConfigurado, 
        executablePath: caminho,
        args: [
            '--no-sandbox',
            '--disabled-setuid-sandbox',
        ]
    })

    if(anonimoConfigurado == true){
        context = await navegador.createIncognitoBrowserContext()
        pagina = await context.newPage()
        const paginas = await navegador.pages()
        await paginas[0].close()
    }else{
        const paginas = await navegador.pages()
        pagina = paginas[0]
    }

    await pagina.setUserAgent(userAgent)
    await acessarGNI(pagina, email, senha)
    
    if(acao == 'remover'){
        await removerPerfis(pagina)
    }else if(acao == 'ver'){
        await verPerfisDesativados(pagina)
    }

    await navegador.close()

}

module.exports = iniciar