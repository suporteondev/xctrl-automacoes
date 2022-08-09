const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const acessarPerfil = require('../instagram/acessarPerfil')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const verificarPerfil = require('../instagram/verificarPerfil')
const Store = require('electron-store')
const store = new Store()

const verificador = async(
    navegadorEscolhido,
    verAcontecendo, 
    modoAnonimo, 
    userAgent,
    seusPerfis, 
    limparLogin,
    esperarEntre,
    logs
)=>{

    // DECLARANDO AS VARIAVEIS REUTILIZAVEIS
    let navegador, pagina, context

    // MONTANDO OS PERFIS
    for(let x = 0; x < seusPerfis.length; x++){

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

        // SELECIONANDO UM USER AGENT MOBILE
        if(userAgent == 'aleatorio'){
            await selecionarUserAgentAleatorio(pagina, 'mobile')
        }else{
            await pagina.setUserAgent(userAgent)
        }

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await pagina.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // CAPTURANDO O USUÁRIO E SENHA DO PERFIL A SER MONTADO
        const { usuario, senha } = seusPerfis[x]
        
        // ACESSANDO O PERFIL
        const resultadoAcessarPerfil = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessarPerfil == false){
            await navegador.close()
            continue
        } 

        // VERIFICANDO OS PERFIS
        for (let x = 0; x < seusPerfis.length; x++) {

            const { usuario: usuarioPerfil } = seusPerfis[x]

            // Capturando os perfis já adicionados no gerenciador
            let perfisGerenciador = store.get('perfisGerenciador')
            let novoArrayPerfisGerenciador = perfisGerenciador

            // Capturando a data atual
            let dataAtual = new Date()
            let dia = dataAtual.getDate().toString().padStart(2, '0')
            let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0')
            let ano = dataAtual.getFullYear()
            let data = `${dia}/${mes}/${ano}`

            await verificarPerfil(pagina, novoArrayPerfisGerenciador, usuarioPerfil, senha, data, logs)

            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(limparLogin == true){
            await limparAtividadeLogin(pagina, usuario, logs)
        }

        // FECHANDO O NAVEGADOR
        await navegador.close()
        break
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = verificador