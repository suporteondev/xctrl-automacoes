const puppeteer = require('puppeteer-core')
const acessarPerfil = require('./src/acessarPerfil')
const capturarDados = require('./src/capturarDados')
const Perfil = require('../../models/perfil')
const path = require('path')
const limparAtividadeLogin = require('./src/limparAtividadeLogin')
var contador = 0

// Iniciando o gerênciamento
const gerenciamento = async(visivelConfigurado, loginConfigurado, anonimoConfigurado, tempoConfigurado, userAgent, perfis, ref, caminho, logs)=>{

    // Criando a variavel que irá abrigar o navegador e a página
    let navegador, pagina, context, deuBom, logado

    // Tentando acessar um perfil
    for(let x = 0; x < perfis.length; x++){

        // Criando o navegador
        navegador = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: visivelConfigurado,
            executablePath: caminho,
            args: [
                '--no-sandbox',
                '--disabled-setuid-sandbox',
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
        await pagina.setExtraHTTPHeaders({
            'Accept-Language': 'pt-br'
        })
        
        // Capturando o perfil
        const { usuario, senha } = perfis[x]
        
        // Acessando o perfil
        const resultado = await acessarPerfil(pagina, usuario, senha, logs)

        // Se der algum erro, fecha o navegador antes de tentar novamente
        if(resultado == false){
            await navegador.close()
        }
        
        // Verificando se acessou para encerrar o laço
        if(resultado == true){
            deuBom = true
            logado = usuario
            break
        }
    }

    if(deuBom == true){
        // Tentando capturar dados de um perfil
        for(let x = 0; x < perfis.length; x++){

            // Captando usuário e senha
            const { usuario, senha } = perfis[x]

            // Capturando dados
            const resultado = await capturarDados(pagina, ref, usuario, senha, contador, logs)

            // Adicionando o usuário no banco de dados
            if(resultado != false){
                try{
                    
                    // Verificando se o usuário passado já existe no banco de dados
                    const existe = await Perfil.findOne({ ref: ref, usuario: usuario })
                            
                    // Se o perfil existir retorna false
                    if(existe){
                        await Perfil.findOneAndUpdate({ ref: ref, usuario: usuario }, resultado)
                    }else{
                        await Perfil.create(resultado)
                    }

                    if(tempoConfigurado != 0){
                        logs.push(`${usuario} - Aguardando ${tempoConfigurado / 1000} segundos.`)
                        await pagina.waitForTimeout(tempoConfigurado)
                    }
                    
                }catch(erro){
                    if(tempoConfigurado != 0){
                        logs.push(`${usuario} - Aguardando ${tempoConfigurado / 1000} segundos.`)
                        await pagina.waitForTimeout(tempoConfigurado)
                    }
                }
            }else{
                break
            }   
        }

        if(loginConfigurado == true){
            await limparAtividadeLogin(pagina, logado, logs)
        }
    }

    // Fechando o navegador
    logs.push('O robô terminou, pode voltar!')
    await navegador.close()

    // Retornando o resultado
    return{
        ok: true
    }
}

module.exports = gerenciamento