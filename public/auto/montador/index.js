const puppeteer = require('puppeteer-core')
const UserAgent = require("user-agents")
const fs = require('fs')
const acessarPerfil = require('./instagram/acessarPerfil')
const alterarBiografiaPerfil = require('./instagram/alterarBiografiaPerfil')
const alterarFotoPerfil = require('./instagram/alterarFotoPerfil')
const realizarPublicacoesFeed = require('./instagram/realizarPublicacoesFeed')
var pastaEscolhida = []

const montador = async(
    caminhoNavegador, 
    modoInvisivelConfigurado,
    modoAnonimoConfigurado,
    generoPerfis,
    modoPerfis,
    listaPerfis,
    pastaFotos,
    fotoPerfilConfigurado,
    alterarBiografiaConfigurado,
    quantidadePublicacoesConfigurado,
    limparLoginConfigurado,
    esperarEntreConfigurado,
    logs
)=>{

    for(let x = 0; x < listaPerfis.length; x++){

        const { usuario, senha } = listaPerfis[x]

        let context, pagina

        // ABRINDO O NAVEGADOR
        const navegador = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: modoInvisivelConfigurado,
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
        if(modoAnonimoConfigurado == true){
            context = await navegador.createIncognitoBrowserContext()
            pagina = await context.newPage()
            const paginas = await navegador.pages()
            await paginas[0].close()
        }else{
            const paginas = await navegador.pages()
            pagina = paginas[0]
        }

        // SELECIONANDO UM USER AGENT MOBILE
        const { userAgent } = new UserAgent({ deviceCategory: 'mobile' })
        await pagina.setUserAgent(userAgent)
        await pagina.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // ACESSANDO O INSTAGRAM
        const resultadoAcessar = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessar == false){
            await navegador.close()
            continue
        }

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
        if(fotoPerfilConfigurado == true){
            const resultadoAlterarFotoPerfil = await alterarFotoPerfil(pagina, usuario, caminhoPasta, logs)
            if(resultadoAlterarFotoPerfil == false){
                await navegador.close()
                continue
            }
        }

        // ALTERANDO A BIOGRAFIA
        if(alterarBiografiaConfigurado == true){
            const resultadoAlterarBiografia = await alterarBiografiaPerfil(pagina, usuario, generoPerfis, logs)
            if(resultadoAlterarBiografia == false){
                await navegador.close()
                continue
            }
        }

        // REALIZANDO PUBLICAÇÕES NO FEED
        if(quantidadePublicacoesConfigurado != 0 || quantidadePublicacoesConfigurado != '0' || quantidadePublicacoesConfigurado != ''){
            logs.push(`Postando fotos no Feed`)
            for(let x = 0; x < quantidadePublicacoesConfigurado; x++){

                const resultadoRealizarPublicacoesFeed = await realizarPublicacoesFeed(pagina, x + 1 ,usuario, caminhoPasta, logs)
                if(resultadoRealizarPublicacoesFeed == false){
                    await navegador.close()
                    continue
                }      
            }
        }

        await navegador.close()
    }

    logs.push('O robô terminou, pode voltar!')
    return true
}

module.exports = montador