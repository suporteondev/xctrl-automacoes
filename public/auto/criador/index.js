const puppeteer = require('puppeteer-core')
const capturarCodigoCryptogmail = require('./cryptogmail/capturarCodigoCryptogmail')
const capturarEmailCryptogmail = require('./cryptogmail/capturarEmailCryptogmail')
const confirmandoCodigo = require('./instagram/confirmandoCodigo')
const preencherDados = require('./instagram/preencherDados')
const selecionarData = require('./instagram/selecionarData')

const criador = async(
    caminhoNavegador,
    modoInvisivelConfigurado,
    modoAnonimoConfigurado,
    userAgent,
    provedorEmail,
    quantidadePerfis,
    generoPerfis,
    senhaPerfis,
    comoSalvar,
    ondeSalvar,
    esperarSegundos
)=>{

    let navegador, pagina, context

    // INICIANDO A CRIAÇÃO DE PERFIS
    for(let x = 0; x < Number(quantidadePerfis); x++){

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

        // CAPTURANDO EMAIL
        let email = ''
        if(provedorEmail == 'cryptogmail'){
            const resultado = await capturarEmailCryptogmail(x + 1, pagina)
            if(resultado.ok == false){
                await navegador.close()
                continue
            }else{
                email = resultado.email
            }
        }

        // PREENCHENDO OS DADOS
        const pagina2 = await context.newPage()
        const resultado2 = await preencherDados(x + 1, pagina2, email, senhaPerfis, generoPerfis)
        if(resultado2.ok == false){
            await navegador.close()
            continue
        }
        
        // ESCOLHENDO A DATA
        const resultado3 = await selecionarData(x + 1, pagina2)
        if(resultado3.ok == false){
            await navegador.close()
            continue
        }

        // CAPTURANDO O CÓDIGO
        const resultado4 = await capturarCodigoCryptogmail(x + 1, pagina)
        if(resultado4.ok == false){
            await navegador.close()
            continue
        }

        // CONFIRMANDO O CÓDIGO
        await confirmandoCodigo(x + 1, pagina2, resultado4.codigo)
        await navegador.close()
    }

    await navegador.close()

    global.criador.push('O robô terminou, pode voltar!')
}

module.exports = criador