const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')

const seguirPerfis = async(
    navegadorEscolhido,
    verAcontecendo, 
    modoAnonimo,
    usuarios,
    usuariosSeguidores,
    esperarEntre,
    perfisEngajamentos,
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

    for(let x = 0; x < usuariosSeguidores.length; x++){

        logs.push('Acessando o instagram')

        // CAPTURANDO O USUÁRIO DO PERFIL SEGUIDOR
        const usuarioSeguidor = usuariosSeguidores[x]

        // CAPTURANDO A INDEX DO PERFIL QUE VAI SEGUIR
        const indexPerfil = perfisEngajamentos.findIndex(perfil => perfil.usuario === usuarioSeguidor)

        // CAPTURANDO OS DADOS DO PERFIL QUE VAI SEGUIR
        const { usuario, cookies, userAgent } = perfisEngajamentos[indexPerfil]

        // SELECIONANDO UM USER AGENT MOBILE
        await pagina.setUserAgent(userAgent)

        // ALTERANDO A LINGUAGEM DO NAVEGADOR
        await pagina.setExtraHTTPHeaders({ 'Accept-Language': 'pt-br' })
        
        // ACESSANDO O PERFIL PELO COOKIE
        logs.push(usuario + ' - Acessando o perfil')
        await pagina.setCookie(...cookies)

        // SEGUINDO OS PERFIS
        for(let x = 0; x < usuarios.length; x++){
            try{

                // CAPTURANDO O USUÁRIO DO PERFIL A SER SEGUIDO
                const usuarioPerfil = usuarios[x]

                logs.push(usuario + ' - Seguindo ' + usuarioPerfil)

                // ACESSANDO O PERFIL DO USUÁRIO
                await pagina.goto(`https://www.instagram.com/${usuarioPerfil}/`)

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