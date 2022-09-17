const puppeteer = require('puppeteer-core')
const acessarPerfil = require('../instagram/acessarPerfil')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const acessarGni = require('../ganharnasredes/acessar')
const cadastrarPerfilGNR = require('../ganharnasredes/cadastrarPerfil')
const iniciarAcoesGNR = require('../ganharnasredes/iniciarAcoes')
const realizarAcoesGNR = require('../ganharnasredes/realizarAcoes')

const realizador = async(
    navegadorEscolhido,
    verAcontecendo,
    modoAnonimo,
    userAgent,
    seusPerfis,
    vincularPerfisNaoCadastrados,
    assistirStoryEntreXAcoes,
    assistirStoryPorXSegundos,
    quantidadeAcoes,
    esperarEntreAcoes,
    limparLogin,
    qualPlataforma,
    emailPlataforma,
    senhaPlataforma,
    logs
)=>{
    // DECLARANDO AS VARIAVEIS REUTILIZAVEIS
    let navegador, pagina, paginaInstagram, context

    // ABRINDO O NAVEGADOR
    if(navegadorEscolhido == 'google'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
            })   
        }
    }else if(navegadorEscolhido == 'edge'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
            })   
        }
    }else if(navegadorEscolhido == 'brave'){
        try{
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
            })   
        }catch(erro){
            navegador = await puppeteer.launch({
                ignoreHTTPSErrors: true,
                headless: verAcontecendo,
                executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                args: [
                    '--no-sandbox',
                    '--disabled-setuid-sandbox'
                ],
                defaultViewport: {
                    width: 320,
                    height: 580
                }
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

    // SELECIONANDO UM USER AGENT MOBILE - pagina
    if(userAgent == 'aleatorio'){
        await selecionarUserAgentAleatorio(pagina, 'desktop')
    }else{
        await pagina.setUserAgent(userAgent)
    }

    // ALTERANDO A LINGUAGEM DO NAVEGADOR - pagina
    await pagina.setExtraHTTPHeaders({
        'Accept-Language': 'pt-br'
    })

    // ABRINDO A NOVA PÁGINA DO INSTAGRAM - paginaInstagram
    if(modoAnonimo == true){
        paginaInstagram = await context.newPage()
    }else{
        paginaInstagram = await navegador.newPage()
    }

    // SELECIONANDO UM USER AGENT MOBILE - paginaInstagram
    if(userAgent == 'aleatorio'){
        await selecionarUserAgentAleatorio(paginaInstagram, 'mobile')
    }else{
        await paginaInstagram.setUserAgent(userAgent)
    }

    // ALTERANDO A LINGUAGEM DO NAVEGADOR
    await paginaInstagram.setExtraHTTPHeaders({
        'Accept-Language': 'pt-br'
    })

    // ACESSANDO A PLATAFORMA
    if(qualPlataforma == 'gni'){

        // ACESSANDO O GANHAR NAS REDES
        const resultadoACessarGni = await acessarGni(pagina, emailPlataforma, senhaPlataforma, logs)
        if(resultadoACessarGni == false){
            await navegador.close()
            return false
        }

        for(let x = 0; x < seusPerfis.length; x++){
            
            // CAPTURANDO O USUÁRIO E SENHA DO PERFIL
            const { usuario, senha } = seusPerfis[x]

            // TRAZENDO A PÁGINA PARA FRENTE
            await paginaInstagram.bringToFront()

            // ACESSANDO O PERFIL DO INSTAGRAM
            const acessarPerfilInstagram = await acessarPerfil(paginaInstagram, usuario, senha, logs)
            if(acessarPerfilInstagram == false){
                const cookies = await paginaInstagram.cookies()
                await paginaInstagram.deleteCookie(...cookies)
                continue
            }

            // CADASTRANDO O PERFIL NA PLATAFORMA
            const resultadoCadastrarPerfil = await cadastrarPerfilGNR(pagina, paginaInstagram, usuario, logs)
            
            if(resultadoCadastrarPerfil == true){

                // INICIANDO AS AÇÕES NA PLATAFORMA
                await iniciarAcoesGNR(pagina, usuario, logs)
                
                // REALIZANDO AS AÇÕES
                await realizarAcoesGNR(navegador, pagina, paginaInstagram, quantidadeAcoes, usuario, logs)
                
            }

            // APAGANDO OS COOKIES DO INSTAGRAM
            const cookies = await paginaInstagram.cookies()
            await paginaInstagram.deleteCookie(...cookies)
        }
    }

    // FECHANDO O NAVEGADOR
    await navegador.close()
}

module.exports = realizador