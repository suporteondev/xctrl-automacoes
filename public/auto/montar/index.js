// Imports do sistema
const puppeteer = require('puppeteer-core')

// Meus imports
const acessarInstagram = require('./instagram/acessarInstagram')
const fotoPerfil = require('./instagram/fotoPerfil')
const alterarBiografia = require('./instagram/alterarBiogria')
const publicarFotos = require('./instagram/publicarFotos')

const montador = async(caminho, modoInvisivel, userAgent, anonimoConfigurado, usuario, senha, biografia, perfil, publicacoes, logs)=>{
    
    let navegador, pagina, context, resultado
    
    // Configurações do navegador
    navegador = await puppeteer.launch({
        executablePath: caminho,
        headless: modoInvisivel,
        args: [
            '--no-sandbox',
            '--disabled-setuid-sandbox',
            '--disable-gpu',
            '--disable-extensions',
            '--dns-prefetch-disable',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors',
            '--allow-running-insecure-content',
            '--enable-features=NetworkService',
        ],
        defaultViewport: {
            width: 320,
            height: 580
        },
    })

    if(anonimoConfigurado == true){
        context = await navegador.createIncognitoBrowserContext()
        pagina = await context.newPage()
        const paginas = await navegador.pages()
        await paginas[0].close()
    }else{
        const paginas = await navegador.pages()
        pagina = paginas[0]
    }

    await pagina.setCacheEnabled(false)
    await pagina.setUserAgent(userAgent)
   
    // ACESSAR O INSTAGRAM
    resultado = await acessarInstagram(pagina, usuario, senha, logs)
    if(resultado == true){

        // ALTERAR BIOGRAFIA
        resultado = await alterarBiografia(pagina, usuario, biografia, 0, logs)
        if(resultado == true){

            // PUBLICAR FOTO DE PERFIL
            resultado = await fotoPerfil(pagina, perfil, usuario, 0, logs)
            if(resultado == true){

                // REALIZANDO PUBLICAÇÕES
                resultado = await publicarFotos(pagina, usuario, publicacoes, logs)
                if(resultado == true){
                    await navegador.close()
                    logs.push('')
                    
                    return 'Seu perfil foi montado com sucesso!'
                }else{
                    await navegador.close()
                    logs.push('')
                    
                    return resultado
                }
            }else{
                await navegador.close()
                logs.push('')
                
                return resultado
            }
        }else{
            await navegador.close()
            logs.push('')
            
            return resultado
        }
    }else{
        await navegador.close()
        logs.push('')
        
        return resultado
    }
}

module.exports = montador