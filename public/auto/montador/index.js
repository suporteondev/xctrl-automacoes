const fs = require('fs')
const puppeteer = require('puppeteer-core')
const acessarPerfil = require('../instagram/acessarPerfil')
const alterarGeneroPerfil = require('../instagram/alterarGeneroPerfil')
const postarFotoPerfil = require('../instagram/postarFotoPerfil')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const alterarBiografiaPerfil = require('../instagram/alterarBiografiaPerfil')
const realizarPublicacoesFeed = require('../instagram/realizarPublicacoesFeed')
const realizarPublicacoesStory = require('../instagram/realizarPublicacoesStory')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const seguirPerfisFamosos = require('../instagram/seguirPerfisFamosos')
const path = require('path')
const { rootPath } = require('electron-root-path')
var pastaEscolhida = []

const montador = async(
    navegadorEscolhido,
    verAcontecendo,
    modoAnonimo,
    userAgent,
    seusPerfis,
    generoPerfis,
    alterarFotoPerfil,
    alterarBiografia,
    quantidadePublicacoesFeed,
    quantidadePublicacoesStory,
    seguirPerfis,
    limparLogin,
    esperarEntre,
    logs
)=>{
    // DECLARANDO AS VARIAVEIS REUTILIZAVEIS
    let navegador, pagina, context, caminhoPasta

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

        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        // ALTERANDO O GÊNERO DOS PERFIS
        await alterarGeneroPerfil(pagina, usuario, generoPerfis, logs)
        if(esperarEntre != 0){
            logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
            await pagina.waitForTimeout(esperarEntre)
        }
    
        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        const caminhoPublicacoes = path.join(rootPath, `./publicacoes/${generoPerfis == 'masculino' ? 'masculinas' : 'femininas'}`)

        // CAPTURANDO A PASTA DE PUBLICAÇÕES
        const pastas = fs.readdirSync(caminhoPublicacoes)
        let caminhoPasta = ''
        async function selecionarCaminho(){
            pastaEscolhida.length == pastas.length ? pastaEscolhida = [] : ''
            caminhoPasta = `${caminhoPublicacoes}\\${pastas[Math.floor(Math.random() * pastas.length)]}`
            if(pastaEscolhida.indexOf(caminhoPasta) >=0){
                return selecionarCaminho()
            }
            return pastaEscolhida.push(caminhoPasta)
        }
        await selecionarCaminho()

        // POSTANDO A FOTO DE PERFIL
        if(alterarFotoPerfil == true){
            await postarFotoPerfil(pagina, usuario, senha, caminhoPasta, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        // ALTERANDO A BIOGRAFIA DO PERFIL
        if(alterarBiografia == true){
            await alterarBiografiaPerfil(pagina, usuario, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        // POSTANDO FOTOS NO FEED
        if(quantidadePublicacoesFeed != 0 && quantidadePublicacoesFeed != '0' && quantidadePublicacoesFeed != ''){
            logs.push(`Postando fotos no Feed`)
            for(let x = 0; x < quantidadePublicacoesFeed; x++){

                var perfilBloqueado = await pagina.evaluate(()=>{

                    let resultado = false
        
                    document.querySelectorAll('span').forEach((e)=>{
                        if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                            resultado = true
                        }
                    })
        
                    return resultado
                })
        
                if(perfilBloqueado == true){
                    break
                }

                await realizarPublicacoesFeed(pagina, x + 1, usuario, caminhoPasta, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }
        }

        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        // SEGUINDO PERFIS FAMOSOS
        if(seguirPerfis != 0 && seguirPerfis != '0' && seguirPerfis != ''){
            await seguirPerfisFamosos(pagina, usuario, seguirPerfis, esperarEntre, logs)
        }

        // POSTANDO FOTOS NO STORY
        if(quantidadePublicacoesStory != 0 && quantidadePublicacoesStory != '0' && quantidadePublicacoesStory != ''){
            logs.push(`Postando fotos no story`)
            for(let x = 0; x < quantidadePublicacoesStory; x++){

                var perfilBloqueado = await pagina.evaluate(()=>{

                    let resultado = false
        
                    document.querySelectorAll('span').forEach((e)=>{
                        if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                            resultado = true
                        }
                    })
        
                    return resultado
                })
        
                if(perfilBloqueado == true){
                    break
                }

                await realizarPublicacoesStory(pagina, x + 1 , usuario, caminhoPasta, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }
        }

        var perfilBloqueado = await pagina.evaluate(()=>{

            let resultado = false

            document.querySelectorAll('span').forEach((e)=>{
                if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                    resultado = true
                }
            })

            return resultado
        })

        if(perfilBloqueado == true){
            logs.push(`${usuario} - O perfil foi bloqueado, iremos pulá-lo para poupar tempo.`)
            await navegador.close()
            continue
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(limparLogin == true){
            await limparAtividadeLogin(pagina, usuario, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // FECHANDO O NAVEGADOR
        await navegador.close()
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = montador