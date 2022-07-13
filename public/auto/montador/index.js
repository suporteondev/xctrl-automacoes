const puppeteer = require('puppeteer-core')
const UserAgent = require("user-agents")
const acessarPerfil = require('./instagram/acessarPerfil')
const alterarBiografiaPerfil = require('./instagram/alterarBiografiaPerfil')

const montador = async(
    caminhoNavegador, 
    modoInvisivelConfigurado,
    modoAnonimoConfigurado,
    generoPerfis,
    modoPerfis,
    listaPerfis,
    pastaFotos,
    fotoPerfil,
    alterarBiografia,
    quantidadePublicacoes,
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

        // ACESSANDO O INSTAGRAM
        const resultadoAcessar = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessar == false){
            await navegador.close()
            continue
        }

        // ALTERANDO A BIOGRAFIA
        if(alterarBiografia == true){
            const resultadoAlterarBiografia = await alterarBiografiaPerfil(pagina, usuario, generoPerfis, logs)
            if(resultadoAlterarBiografia == false){
                await navegador.close()
                continue
            }
        }

        await navegador.close()
    }

    logs.push('O robô terminou, pode voltar!')
    return true
}

module.exports = montador