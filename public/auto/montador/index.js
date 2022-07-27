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
var pastaEscolhida = []

const montador = async(
    caminhoNavegador, 
    verAcontecendo,
    modoAnonimo,
    userAgent,
    seusPerfis,
    caminhoPastaFotos,
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

    // ABRINDO O NAVEGADOR
    navegador = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        headless: verAcontecendo,
        executablePath: caminhoNavegador,
        args: [
            '--no-sandbox',
            '--disabled-setuid-sandbox'
        ],
        defaultViewport: {
            width: 320,
            height: 580
        }
    })

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

    // MONTANDO OS PERFIS
    for(let x = 0; x < seusPerfis.length; x++){

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
            const cookies = await pagina.cookies()
            await pagina.deleteCookie(...cookies)
            continue
        } 

        // ALTERANDO O GÊNERO DOS PERFIS
        await alterarGeneroPerfil(pagina, usuario, generoPerfis, logs)
        if(esperarEntre != 0){
            logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
            await pagina.waitForTimeout(esperarEntre)
        }

        // CAPTURANDO A PASTA DE PUBLICAÇÕES
        const pastas = fs.readdirSync(caminhoPastaFotos)
        let caminhoPasta = ''
        async function selecionarCaminho(){
            pastaEscolhida.length == pastas.length ? pastaEscolhida = [] : ''
            caminhoPasta = `${caminhoPastaFotos}\\${pastas[Math.floor(Math.random() * pastas.length)]}`
            if(pastaEscolhida.indexOf(caminhoPasta) >=0){
                return selecionarCaminho()
            }
            return pastaEscolhida.push(caminhoPasta)
        }
        await selecionarCaminho()

        // POSTANDO A FOTO DE PERFIL
        if(alterarFotoPerfil == true){
            await postarFotoPerfil(pagina, usuario, caminhoPasta, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // ALTERANDO A BIOGRAFIA DO PERFIL
        if(alterarBiografia == true){
            await alterarBiografiaPerfil(pagina, usuario, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // POSTANDO FOTOS NO FEED
        if(quantidadePublicacoesFeed != 0 || quantidadePublicacoesFeed != '0' || quantidadePublicacoesFeed != ''){
            logs.push(`Postando fotos no Feed`)
            for(let x = 0; x < quantidadePublicacoesFeed; x++){
                await realizarPublicacoesFeed(pagina, x + 1, usuario, caminhoPasta, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }
        }

        // POSTANDO FOTOS NO STORY
        if(quantidadePublicacoesStory != 0 || quantidadePublicacoesStory != '0' || quantidadePublicacoesStory != ''){
            logs.push(`Postando fotos no story`)
            for(let x = 0; x < quantidadePublicacoesStory; x++){
                await realizarPublicacoesStory(pagina, x + 1 , usuario, caminhoPasta, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }
        }

        // SEGUINDO PERFIS FAMOSOS
        if(seguirPerfis != 0 || seguirPerfis != '0' || seguirPerfis != ''){
            await seguirPerfisFamosos(pagina, usuario, seguirPerfis, esperarEntre, logs)
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(limparLogin == true){
            await limparAtividadeLogin(pagina, usuario, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // LIMPANDO OS COOKIES PARA RECOMEÇAR
        const cookies = await pagina.cookies()
        await pagina.deleteCookie(...cookies)
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
    await navegador.close()
}

module.exports = montador