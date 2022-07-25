const puppeteer = require('puppeteer-core')
const fs = require('fs')
const acessarPerfil = require('./instagram/acessarPerfil')
const alterarBiografiaPerfil = require('./instagram/alterarBiografiaPerfil')
const alterarFotoPerfilFuncao = require('./instagram/alterarFotoPerfil')
const realizarPublicacoesFeed = require('./instagram/realizarPublicacoesFeed')
const limparAtividadeLogin = require('./instagram/limparAtividadeLogin')
const listaDeUserAgentsMobile = require('../../userAgentsMobile')
const alterarGeneroPerfil = require('./instagram/alterarGeneroPerfil')
const realizarPublicacoesStory = require('./instagram/realizarPublicacoesStory')
var pastaEscolhida = []
var userAgentsEscolhidos = []

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

    const listaUserAgents = [...new Set(listaDeUserAgentsMobile)]

    for(let x = 0; x < seusPerfis.length; x++){

        const { usuario, senha } = seusPerfis[x]

        let context, pagina

        // ABRINDO O NAVEGADOR
        const navegador = await puppeteer.launch({
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
            },
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

        // SELECIONANDO UM USER AGENT MOBILE
        if(userAgent == 'aleatorio'){

            let userAgentEscolhido = ''
            
            async function selecionarUserAgent(){
                userAgentsEscolhidos.length == listaUserAgents.length ? userAgentsEscolhidos = [] : ''
                userAgentEscolhido = listaUserAgents[Math.floor(Math.random() * listaUserAgents.length)]

                if(userAgentsEscolhidos.indexOf(userAgentEscolhido) >=0){
                    return selecionarUserAgent()
                }

                return userAgentsEscolhidos.push(userAgentEscolhido)
            }

            await selecionarUserAgent()
            await pagina.setUserAgent(userAgentEscolhido)
            console.log(userAgentEscolhido)
        }else{
            await pagina.setUserAgent(userAgent)
        }

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await pagina.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // ACESSANDO O INSTAGRAM
        const resultadoAcessar = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessar == false){
            await navegador.close()
            continue
        }else{

            // ALTERANDO O GÊNERO DOS PERFIS
            await alterarGeneroPerfil(pagina, usuario, generoPerfis, logs)

            // SELECIONANDO UMA PASTA ALEATÓRIA
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

            // ALTERANDO A FOTO DE PERFIL
            if(alterarFotoPerfil == true){
                const resultadoAlterarFotoPerfil = await alterarFotoPerfilFuncao(pagina, usuario, caminhoPasta, logs)
                if(resultadoAlterarFotoPerfil == false){
                    await navegador.close()
                    continue
                }
            }

            // ALTERANDO A BIOGRAFIA
            if(alterarBiografia == true){
                const resultadoAlterarBiografia = await alterarBiografiaPerfil(pagina, usuario, generoPerfis, logs)
                if(resultadoAlterarBiografia == false){
                    await navegador.close()
                    continue
                }
            }

            // REALIZANDO PUBLICAÇÕES NO FEED
            if(quantidadePublicacoesFeed != 0 || quantidadePublicacoesFeed != '0' || quantidadePublicacoesFeed != ''){
                logs.push(`Postando fotos no Feed`)
                for(let x = 0; x < quantidadePublicacoesFeed; x++){

                    const resultadoRealizarPublicacoesFeed = await realizarPublicacoesFeed(
                        pagina, 
                        x + 1 ,
                        usuario, 
                        caminhoPasta, 
                        logs
                    )
                    
                    if(resultadoRealizarPublicacoesFeed == false){
                        await navegador.close()
                        continue
                    }      
                }
            }

            // REALIZANDO PUBLICAÇÕES NO STORY
            if(quantidadePublicacoesStory != 0 || quantidadePublicacoesStory != '0' || quantidadePublicacoesStory != ''){
                logs.push(`Postando fotos no story`)
                for(let x = 0; x < quantidadePublicacoesStory; x++){

                    const resultadoRealizarPublicacoesStory = await realizarPublicacoesStory(
                        pagina, 
                        x + 1 ,
                        usuario, 
                        caminhoPasta, 
                        logs
                    )
                    
                    if(resultadoRealizarPublicacoesStory == false){
                        await navegador.close()
                        continue
                    }      
                }
            }

            // LIMPANDO A ATIVIDADE DE LOGIN
            if(limparLogin == true){
                await limparAtividadeLogin(pagina, usuario, logs)
            }
        }

        await navegador.close()
    }

    logs.push('O robô terminou, pode voltar!')
    return true
}

module.exports = montador