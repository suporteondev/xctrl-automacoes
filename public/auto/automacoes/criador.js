const puppeteer = require('puppeteer-core')

// cryptogmail
const capturarEmail = require('../tempmails/cryptogmail/capturarEmail')
const capturarCodigo = require('../tempmails/cryptogmail/capturarCodigo')
const capturarEmailDisposablemail = require('../tempmails/disposablemail/capturarEmail')
const capturarCodigoDisposablemail = require('../tempmails/disposablemail/capturarCodigo')
const capturarEmailTM = require('../tempmails/mailtm/capturarEmail')
const capturarCodigoTM = require('../tempmails/mailtm/capturarCodigo')
const preencherDados = require('../instagram/preencherDados')
const selecionarData = require('../instagram/selecionarData')
const digitandoCodigo = require('../instagram/digitandoCodigo')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const alterarGeneroPerfil = require('../instagram/alterarGeneroPerfil')
const postarFotoPerfil = require('../instagram/postarFotoPerfil')
const alterarBiografiaPerfil = require('../instagram/alterarBiografiaPerfil')
const realizarPublicacoesFeed = require('../instagram/realizarPublicacoesFeed')
const realizarPublicacoesStory = require('../instagram/realizarPublicacoesStory')
const seguirPerfisFamosos = require('../instagram/seguirPerfisFamosos')
const limparPastaPrefetch = require('../atalhos/limparPastaPrefetch')
const limparPastaTemp = require('../atalhos/limparPastaTemp')
const { rootPath } = require('electron-root-path')
const path = require('path')
const fs = require('fs')
var pastaEscolhida = []

const listaEmailsTemporarios = [
    'cryptogmail',
    'mailtm',
    'disposablemail'
]

const criador = async(
    navegadorEscolhido,
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
            try{
                await limparPastaPrefetch(logs)
            }catch(erro){}
        }

        // LIMPANDO A PASTA TEMP
        if(limparPastaTempConfigurado == true){
            try{
                await limparPastaTemp(logs)
            }catch(erro){}
        }

        // ABRINDO O NAVEGADOR
        if(navegadorEscolhido == 'google'){
            try{
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }catch(erro){
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }
        }else if(navegadorEscolhido == 'edge'){
            try{
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }catch(erro){
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }
        }else if(navegadorEscolhido == 'brave'){
            try{
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files (x86)\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }catch(erro){
                navegador = await puppeteer.launch({
                    ignoreHTTPSErrors: true,
                    headless: verAcontecendoConfigurado,
                    executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
                    args: [
                        '--no-sandbox',
                        '--disabled-setuid-sandbox'
                    ]
                })   
            }
        }

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
            if(emailTemporario == 'aleatorio'){
                emailTemporarioSelecionado = listaEmailsTemporarios[Math.floor(Math.random() * listaEmailsTemporarios.length)]
            }
            await navegador.close()
            continue
        }
        const { codigo } = resCodigo

        // FINALIZANDO A CRIAÇÃO DO PERFIL
        const resDigitandoCodigo = await digitandoCodigo(x, paginaInstagram, paginaEmail, emailTemporarioSelecionado, comoSalvar, generoPerfis, usuario, senhaPerfis, codigo, logs)
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

        logs.push(`perfil ${x} - ` + 'Verificando se existe algum cookie.')
        await paginaInstagram.waitForTimeout(10000)
        const cokkieEncontrado = await paginaInstagram.evaluate(()=>{
            let resultado = false
            const spans = document.querySelectorAll('span')
            for(let x = 0; x < spans.length; x++){
                const span = spans[x]
                if(span.innerText == 'Permitir todos os cookies'){
                    span.click()
                    resultado = true
                    break
                }
            }

            return resultado
        })
        
        if(cokkieEncontrado == true){
            logs.push(`perfil ${x} - ` + 'Aceitando todos os cookies.')
            await paginaInstagram.waitForTimeout(10000)
        }else{
            logs.push(`perfil ${x} - ` + 'Nenhum cookie encontrado.')
        }

        if(montarPerfisConfigurado == true){

            logs.push(usuario + ' - Montador em execução')

            // ALTERANDO O GÊNERO DOS PERFIS
            await alterarGeneroPerfil(paginaInstagram, usuario, generoPerfis, logs)
            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await paginaInstagram.waitForTimeout(esperarEntre)
            }

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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
                await alterarBiografiaPerfil(paginaInstagram, usuario, logs)
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await paginaInstagram.waitForTimeout(esperarEntre)
                }
            }

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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
                    await realizarPublicacoesFeed(paginaInstagram, x + 1, usuario, caminhoPasta, logs)
                    if(esperarEntre != 0){
                        logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                        await paginaInstagram.waitForTimeout(esperarEntre)
                    }
                }
            }

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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
                await seguirPerfisFamosos(paginaInstagram, usuario, seguirPerfis, esperarEntre, logs)
            }

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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

            // POSTANDO FOTOS NO STORY
            if(quantidadePublicacoesStory != 0 && quantidadePublicacoesStory != '0' && quantidadePublicacoesStory != ''){
                logs.push(`Postando fotos no story`)
                for(let x = 0; x < quantidadePublicacoesStory; x++){
                    await realizarPublicacoesStory(paginaInstagram, x + 1 , usuario, caminhoPasta, logs)
                    if(esperarEntre != 0){
                        logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                        await paginaInstagram.waitForTimeout(esperarEntre)
                    }
                }
            }

            var perfilBloqueado = await paginaInstagram.evaluate(()=>{

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

            var buscar = `${usuario} - Montador em execução`
            var indice = logs.indexOf(buscar)
            while(indice >= 0){
                logs.splice(indice, 1)
                indice = logs.indexOf(buscar)
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