const fs = require('fs')
const { rootPath } = require('electron-root-path')
const path = require('path')
const procurarBloqueios = require('./procurarBloqueios')

const digitandoCodigo = async(
    identificador, 
    pagina, 
    paginaEmail,
    emailTemporarioSelecionado,
    comoSalvar,
    generoPerfis,
    usuario, 
    senha, 
    codigo,
    logs
)=>{
    try{
        
        const ondeSalvar = path.join(rootPath, `./perfis/${generoPerfis == 'masculino' ? 'masculinos.txt' : 'femininos.txt'}`)

        // Esperando o seletor
        logs.push('Confirmando o código')
        await pagina.bringToFront()
        await pagina.waitForSelector('input[aria-label="Código de confirmação"]', { timeout: 60000 })

        // Digitando o código
        logs.push(`perfil ${identificador} - ` + 'Digitando o código')
        await pagina.type('input[aria-label="Código de confirmação"]', codigo, { delay: 100 })

        // Confirmando o código
        logs.push(`perfil ${identificador} - ` + 'Confirmando o código')
        await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
        await pagina.click('button[type="submit"]')
        await pagina.waitForTimeout(30000)

        const bloqueio = await procurarBloqueios(pagina, `perfil ${identificador}`, logs)
        if(bloqueio == true){
            logs.push(`perfil ${identificador} - Erro ao tentar criar o perfil.`)
            return {
                ok: false
            }
        } 

        // Ocorreu um erro ao criar sua conta. Tente novamente em breve.
        const ocorreuUmErro = await pagina.evaluate(()=>{
            const divs = document.querySelectorAll('div')
            let resultado = false

            for(let x = 0; x < divs.length; x++){
                const div = divs[x]
                if(div.innerText == 'Ocorreu um erro ao criar sua conta. Tente novamente em breve.'){
                    resultado = true
                    break
                }
            }

            return resultado
        })
        
        if(ocorreuUmErro == true){
            logs.push(`perfil ${identificador} - ` + 'Ocorreu um erro ao tentar criar o perfil, mas iremos tentar acessá-lo para ter certeza de que não foi criado.')
            try{
                logs.push('Acessando o instagram')
                await pagina.goto('https://www.instagram.com/accounts/login/', { timeout: 60000 })

                try{
                    logs.push(`perfil ${identificador} - Aceitando os cookies`)
                    await pagina.waitForSelector('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K', { timeout: 5000 })
                    await pagina.click('.sqdOP.L3NKy._4pI4F.y3zKF.cB_4K')
                    await pagina.waitForTimeout(5000)
                }catch(erro){
                    
                }

                logs.push(`perfil ${identificador} - Digitando usuário.`)
                await pagina.waitForSelector('input[name="username"]', { timeout: 60000 })
                await pagina.type('input[name="username"]', usuario)

                logs.push(`perfil ${identificador} - Digitando senha.`)
                await pagina.waitForSelector('input[name="password"]', { timeout: 60000 })
                await pagina.type('input[name="password"]', senha)

                logs.push(`perfil ${identificador} - Entrando no perfil.`)
                await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
                await pagina.click('button[type="submit"]')

                logs.push(`perfil ${identificador} - Esperando carregar.`)
                await pagina.waitForNavigation({ timeout: 60000 })

                // FUI EU
                await pagina.evaluate(()=>{
                    const botoes = document.querySelectorAll('button')
                    for(let x = 0; x < botoes.length; x++){
                        const botao = botoes[x]
                        if(botao.innerText == 'Fui eu'){
                            botao.click()
                            break
                        }
                    }
                })

                // Apertando em agora não
                await pagina.waitForSelector('.cmbtv > button', { timeout: 60000 })
                await pagina.click('.cmbtv > button')

                // Esperando o direct aparecer
                await pagina.waitForSelector('[aria-label="Página inicial"]') 
                
                // Retornando o sucesso
                logs.push(`perfil ${identificador} - ` + 'Perfil criado com sucesso!')
                if(comoSalvar == 'linha'){
                    fs.appendFile(ondeSalvar, `\n${usuario} ${senha}`, function(err){
                        if(err){
                            console.log(err)
                        }
                    })
                }else if(comoSalvar == 'coluna'){
                    fs.appendFile(ondeSalvar, `\n\n${usuario}\n${senha}`, function(err){
                        if(err){
                            console.log(err)
                        }
                    })
                }

                return {
                    ok: true
                } 
            }catch(error){
                logs.push(`perfil ${identificador} - Erro ao tentar criar o perfil.`)
                return {
                    ok: false
                }
            }
        }

        // FUI EU
        await pagina.evaluate(()=>{
            const botoes = document.querySelectorAll('button')
            for(let x = 0; x < botoes.length; x++){
                const botao = botoes[x]
                if(botao.innerText == 'Fui eu'){
                    botao.click()
                    break
                }
            }
        })

        // Esperando o direct aparecer
        logs.push(`perfil ${identificador} - ` + 'Esperando o direct aparecer')
        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

        logs.push(`perfil ${identificador} - ` + 'Perfil criado com sucesso!')
        if(comoSalvar == 'linha'){
            fs.appendFile(ondeSalvar, `\n${usuario} ${senha}`, function(err){
                if(err){
                    console.log(err)
                }
            })
        }else if(comoSalvar == 'coluna'){
            fs.appendFile(ondeSalvar, `\n\n${usuario}\n${senha}`, function(err){
                if(err){
                    console.log(err)
                }
            })
        }

        return {
            ok: true
        }
        
    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar criar o perfil.')
        return{
            ok: false
        }
    }
}

module.exports = digitandoCodigo