const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const Engajamentos = require('../../models/engajamento')
const acessarPerfil = require('../instagram/acessarPerfil')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')

const seguirPerfis = async(
    navegadorEscolhido,
    verAcontecendo, 
    modoAnonimo,
    perfis,
    usuarios,
    esperarEntre,
    logs
)=>{

    // DECLARANDO AS VARIAVEIS REUTILIZAVEIS
    let navegador, pagina, context

    for(let x = 0; x < perfis.length; x++){

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

        // CAPTURANDO O USUÁRIO DO PERFIL SEGUIDOR
        const { usuario, senha, ref } = perfis[x]

        // SETANDO O USER AGENT
        await selecionarUserAgentAleatorio(pagina, 'mobile')

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await pagina.setExtraHTTPHeaders({ 'Accept-Language': 'pt-br' })
        
        // ACESSANDO O PERFIL PELO COOKIE
        const resultadoAcessarPerfil = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessarPerfil == false){
            await navegador.close()
            continue
        }

        // SEGUINDO OS PERFIS
        logs.push('Seguindo sua lista de perfis')
        for(let x = 0; x < usuarios.length; x++){

            // CAPTURANDO O USUÁRIO DO PERFIL A SER SEGUIDO
            const usuarioPerfil = usuarios[x]

            try{
                logs.push(usuario + ' - Seguindo ' + usuarioPerfil)

                // ACESSANDO O PERFIL DO USUÁRIO
                await pagina.goto(`https://www.instagram.com/${usuarioPerfil}/`)
                await pagina.waitForTimeout(2000)
                var perfilBloqueado2 = await pagina.evaluate(()=>{
                    let resultado = false
                    document.querySelectorAll('span').forEach((e)=>{
                        if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                            resultado = true
                        }
                    })

                    document.querySelectorAll('h3').forEach((e2)=>{
                        if(e2.innerText == 'Adicionar telefone para voltar ao Instagram'){
                            resultado = true
                        }
                    })
                    return resultado
                })
                
                if(perfilBloqueado2 == true){
                    logs.push(`${usuario} - Perfil foi bloqueado.`)
                    await Engajamentos.findOneAndDelete({ ref, usuario })
                    break
                }

                // SEGUINDO O USUÁRIO
                await pagina.waitForSelector('._aacl._aaco._aacw._adda._aad6._aade')
                await pagina.click('._aacl._aaco._aacw._adda._aad6._aade')

                logs.push(usuario + ' - Seguido com sucesso!')

                // AGUARDANDO O TEMPO CONFIGURADO
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }catch(erro){
                var perfilBloqueado = await pagina.evaluate(()=>{
                    let resultado = false
                    document.querySelectorAll('span').forEach((e)=>{
                        if(e.innerText == 'Se não pudermos confirmar sua conta, ela será desativada permanentemente.'){
                            resultado = true
                        }
                    })

                    document.querySelectorAll('h3').forEach((e2)=>{
                        if(e2.innerText == 'Adicionar telefone para voltar ao Instagram'){
                            resultado = true
                        }
                    })
                    return resultado
                })

                if(perfilBloqueado == true){
                    logs.push(`${usuario} - Perfil foi bloqueado.`)
                    await Engajamentos.findOneAndDelete({ ref, usuario })
                    break
                }else{
                    logs.push(usuario + ' - Não conseguimos seguir esse perfil!')
                }     
            }

        }

        // LIMPAR LOGIN
        await limparAtividadeLogin(pagina, usuario, logs)

        // FECHANDO O NAVEGADOR
        await navegador.close()
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = seguirPerfis