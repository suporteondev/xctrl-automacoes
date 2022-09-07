const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')

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

    for(let x = 0; x < perfis.length; x++){

        logs.push('Acessando o instagram')

        // CAPTURANDO O USUÁRIO DO PERFIL SEGUIDOR
        const { usuario, cookie } = perfis[x]

        // SETANDO O USER AGENT
        await selecionarUserAgentAleatorio(pagina, 'mobile')

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await pagina.setExtraHTTPHeaders({ 'Accept-Language': 'pt-br' })
        
        // ACESSANDO O PERFIL PELO COOKIE
        logs.push(usuario + ' - Acessando o perfil')
        await pagina.setCookie(...cookie)

        // SEGUINDO OS PERFIS
        for(let x = 0; x < usuarios.length; x++){
            try{

                // CAPTURANDO O USUÁRIO DO PERFIL A SER SEGUIDO
                const usuarioPerfil = usuarios[x]

                logs.push(usuario + ' - Seguindo ' + usuarioPerfil)

                // ACESSANDO O PERFIL DO USUÁRIO
                await pagina.goto(`https://www.instagram.com/${usuarioPerfil}/`)

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
                    logs.push(usuario + ' - Não conseguimos seguir esse perfil!')
                    logs.push(`${usuario} - O perfil foi bloqueado.`)
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
                logs.push(usuario + ' - Não conseguimos seguir esse perfil!')
                console.log(erro.message)
            }
        }
    }

    // FECHANDO O NAVEGADOR
    await navegador.close()

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = seguirPerfis