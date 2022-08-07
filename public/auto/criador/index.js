const puppeteer = require('puppeteer-core')
const capturarEmail = require('./cryptogmail/capturarEmail')
const capturarEmailFakemail = require('./fakemail/capturarEmail')
const capturarCodigoFakemail = require('./fakemail/capturarCodigo')
const capturarEmailDisposablemail = require('./disposablemail/capturarEmail')
const capturarCodigoDisposablemail = require('./disposablemail/capturarCodigo')
const capturarEmailTM = require('./mailtm/capturarEmail')
const preencherDados = require('./instagram/preencherDados')
const selecionarData = require('./instagram/selecionarData')
const capturarCodigo = require('./cryptogmail/capturarCodigo')
const capturarCodigoTM = require('./mailtm/capturarCodigo')
const digitandoCodigo = require('./instagram/digitandoCodigo')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const alterarGeneroPerfil = require('../instagram/alterarGeneroPerfil')
const postarFotoPerfil = require('../instagram/postarFotoPerfil')
const alterarBiografiaPerfil = require('../instagram/alterarBiografiaPerfil')
const realizarPublicacoesFeed = require('../instagram/realizarPublicacoesFeed')
const realizarPublicacoesStory = require('../instagram/realizarPublicacoesStory')
const seguirPerfisFamosos = require('../instagram/seguirPerfisFamosos')
const limparPastaPrefetch = require('../../functions/limparPastaPrefetch')
const limparPastaTemp = require('../../functions/limparPastaTemp')
const { rootPath } = require('electron-root-path')
const chromePaths = require('chrome-paths')
const path = require('path')
const fs = require('fs')
var pastaEscolhida = []

const listaEmailsTemporarios = [
    'cryptogmail',
    'mailtm',
    'disposablemail'
]

const criador = async(
    verAcontecendoConfigurado,
    navegadorAnonimoConfigurado,
    userAgent,
    generoPerfis, 
    senhaPerfis, 
    limparLoginConfigurado,
    comoSalvar,
    quantidadePerfis, 
    emailTemporario, 
    esperarEntre,
    limparPastaPrefetchConfigurado,
    limparPastaTempConfigurado,
    montarPerfisConfigurado,
    alterarFotoPerfil,
    alterarBiografia,
    quantidadePublicacoesFeed,
    quantidadePublicacoesStory,
    seguirPerfis,
    logs
)=>{

    // DECLARANDO AS VARIAVEIS REUTILIZAVEIS
    let navegador, paginaEmail, paginaInstagram, context, emailTemporarioSelecionado

    if(emailTemporario == 'aleatorio'){
        emailTemporarioSelecionado = listaEmailsTemporarios[Math.floor(Math.random() * listaEmailsTemporarios.length)]
    }else{
        emailTemporarioSelecionado = emailTemporario
    }

    // COMEÇANDO A CRIAÇÃO DOS PERFIS
    for(let x = 1; x < Number(quantidadePerfis) + 1; x++){

        // LIMPANDO A PASTA PREFETCH
        if(limparPastaPrefetchConfigurado == true){
            await limparPastaPrefetch(logs)
        }

        // LIMPANDO A PASTA TEMP
        if(limparPastaTempConfigurado == true){
            await limparPastaTemp(logs)
        }

        // ABRINDO O NAVEGADOR
        navegador = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: verAcontecendoConfigurado,
            executablePath: chromePaths.chrome,
            args: [
                '--no-sandbox',
                '--disabled-setuid-sandbox'
            ]
        })

        // ABRINDO A NOVA PÁGINA DO EMAIL
        if(navegadorAnonimoConfigurado == true){
            context = await navegador.createIncognitoBrowserContext()
            paginaEmail = await context.newPage()
            const paginas = await navegador.pages()
            await paginas[0].close()
        }else{
            const paginas = await navegador.pages()
            paginaEmail = paginas[0]
        }

        // ABRINDO A NOVA PÁGINA DO INSTAGRAM
        if(navegadorAnonimoConfigurado == true){
            paginaInstagram = await context.newPage()
        }else{
            paginaInstagram = await navegador.newPage()
        }

        // SELECIONANDO UM USER AGENT ALEATÓRIO DESKTOP PARA A PÁGINA DO EMAIL
        userAgent == 'aleatorio' ? 
        await selecionarUserAgentAleatorio(paginaEmail, 'desktop') : 
        await paginaEmail.setUserAgent(userAgent)
        await paginaEmail.setViewport({
            width: 1000,
            height: 700,
            deviceScaleFactor: 1
        })

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await paginaEmail.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })
        
        // CAPTURANDO O EMAIL TEMPORÁRIO
        let resEmail
        if(emailTemporarioSelecionado == 'cryptogmail'){
            resEmail = await capturarEmail(x, paginaEmail, logs)
        }else if(emailTemporarioSelecionado == 'mailtm'){
            resEmail = await capturarEmailTM(x, paginaEmail, logs)
        }else if(emailTemporarioSelecionado == 'disposablemail'){
            resEmail = await capturarEmailDisposablemail(x, paginaEmail, logs)
        }
        if(resEmail.ok == false){
            await navegador.close()
            continue
        }
        const { email } = resEmail

        // SELECIONANDO UM USER AGENT ALEATÓRIO DESKTOP PARA A PÁGINA DO INSTAGRAM
        userAgent == 'aleatorio' ? 
        await selecionarUserAgentAleatorio(paginaInstagram, 'desktop') : 
        await paginaInstagram.setUserAgent(userAgent)

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await paginaInstagram.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })

        // PREENCHENDO OS DADOS DO INSTAGRAM
        await paginaInstagram.setViewport({
            width: 700,
            height: 700,
            deviceScaleFactor: 1
        })
        const resPreencher = await preencherDados(x, paginaInstagram, email, senhaPerfis, generoPerfis, logs)
        if(resPreencher.ok == false){
            await navegador.close()
            continue
        }
        const { usuario } = resPreencher

        // SELECIONANDO A DATA DO PERFIL
        const resData = await selecionarData(x, paginaInstagram, logs)
        if(resData.ok == false){
            await navegador.close()
            continue
        }

        // CAPTURANDO O CÓDIGO NO EMAIL TEMPORÁRIO
        let resCodigo
        if(emailTemporarioSelecionado == 'cryptogmail'){
            resCodigo = await capturarCodigo(x, paginaEmail, logs)
        }else if(emailTemporarioSelecionado == 'mailtm'){
            resCodigo = await capturarCodigoTM(x, paginaEmail, logs)
        }else if(emailTemporarioSelecionado == 'disposablemail'){
            resCodigo = await capturarCodigoDisposablemail(x, paginaEmail, logs)
        }
        if(resCodigo.ok == false){
            emailTemporarioSelecionado = listaEmailsTemporarios[Math.floor(Math.random() * listaEmailsTemporarios.length)]
            await navegador.close()
            continue
        }
        const { codigo } = resCodigo

        // FINALIZANDO A CRIAÇÃO DO PERFIL
        const resDigitandoCodigo = await digitandoCodigo(x, paginaInstagram, comoSalvar, generoPerfis, usuario, senhaPerfis, codigo, logs)
        if(resDigitandoCodigo.ok == false){
            await navegador.close()
            continue
        }

        // ALTERANDO O TAMANHO DA PÁGINA DO INSTAGRAM
        await paginaInstagram.setViewport({
            width: 320,
            height: 580,
            deviceScaleFactor: 1
        })

        // ALTERANDO O USER AGENT PARA MOBILE
        await selecionarUserAgentAleatorio(paginaInstagram, 'mobile')

        if(montarPerfisConfigurado == true){

            // ALTERANDO O GÊNERO DOS PERFIS
            await alterarGeneroPerfil(paginaInstagram, usuario, generoPerfis, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await paginaInstagram.waitForTimeout(esperarEntre)
            }

            // CAPTURANDO A PASTA DE PUBLICAÇÕES
            const caminhoPublicacoes = path.join(rootPath, `./publicacoes/${generoPerfis == 'masculino' ? 'masculinas' : 'femininas'}`)
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
                await postarFotoPerfil(paginaInstagram, usuario, caminhoPasta, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await paginaInstagram.waitForTimeout(esperarEntre)
                }
            }

            // ALTERANDO A BIOGRAFIA DO PERFIL
            if(alterarBiografia == true){
                await alterarBiografiaPerfil(paginaInstagram, usuario, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await paginaInstagram.waitForTimeout(esperarEntre)
                }
            }

            // POSTANDO FOTOS NO FEED
            if(quantidadePublicacoesFeed != 0 || quantidadePublicacoesFeed != '0' || quantidadePublicacoesFeed != ''){
                logs.push(`Postando fotos no Feed`)
                for(let x = 0; x < quantidadePublicacoesFeed; x++){
                    await realizarPublicacoesFeed(paginaInstagram, x + 1, usuario, caminhoPasta, logs)
                    if(esperarEntre != 0){
                        logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                        await paginaInstagram.waitForTimeout(esperarEntre)
                    }
                }
            }

            // POSTANDO FOTOS NO STORY
            if(quantidadePublicacoesStory != 0 || quantidadePublicacoesStory != '0' || quantidadePublicacoesStory != ''){
                logs.push(`Postando fotos no story`)
                for(let x = 0; x < quantidadePublicacoesStory; x++){
                    await realizarPublicacoesStory(paginaInstagram, x + 1 , usuario, caminhoPasta, logs)
                    if(esperarEntre != 0){
                        logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                        await paginaInstagram.waitForTimeout(esperarEntre)
                    }
                }
            }

            // SEGUINDO PERFIS FAMOSOS
            if(seguirPerfis != 0 || seguirPerfis != '0' || seguirPerfis != ''){
                await seguirPerfisFamosos(paginaInstagram, usuario, seguirPerfis, esperarEntre, logs)
            }
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(limparLoginConfigurado == true){
            await limparAtividadeLogin(paginaInstagram, usuario, logs)
        }

        // ESPERANDO OS SEGUNDOS CONFIGURADOS ANTES DE CRIAR O PRÓXIMO PERFIL
        if(esperarEntre != 0){
            logs.push(`perfil ${x} - Aguardando ${esperarEntre / 1000} segundos.`)
            await paginaInstagram.waitForTimeout(esperarEntre)
        }

        // FECHANDO O NAVEGADOR
        await navegador.close()
        continue
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = criador