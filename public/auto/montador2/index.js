// Imports do sistema
const puppeteer = require('puppeteer-core')
const path = require('path')

// Meus imports
const acessarInstagram = require('./instagram/acessarInstagram')
const fotoPerfil = require('./instagram/fotoPerfil')
const alterarBiografia = require('./instagram/alterarBiogria')
const publicarFotos = require('./instagram/publicarFotos')
const Perfil = require('../../models/Perfil')

const montarInstagram = async(
    caminho, 
    userAgent, 
    usuario, 
    senha, 
    biografia, 
    perfil, 
    publicacoes, 
    logs
)=>{

    // Configurações do navegador
    const navegador = await puppeteer.launch({
        executablePath: caminho,
        headless: true,
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

    // Configurações da Página
    const paginas = await navegador.pages()
    const pagina = paginas[0]
    await pagina.setUserAgent(userAgent)
    var resultado
   
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

module.exports = montarInstagram