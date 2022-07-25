const fs = require('fs')
var contador = 1

const alterarFotoPerfil = async(pagina, usuario, pastaFotos, logs)=>{
    try{

        let fotoPerfil = ''

        fs.readdir(pastaFotos, function(erro, fotos){
            fotoPerfil = `${pastaFotos}\\${fotos[Math.floor(Math.random() * fotos.length)]}`
        })

        logs.push('Alterando a foto de perfil')

        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/accounts/edit/')

        await pagina.waitForTimeout(2000)
        const aceitarCookie = await pagina.evaluate(()=>{

            let botoes = document.querySelectorAll('button')

            for(let x = 0; x < botoes.length; x++){

                // Capturando o H2
                const botao = botoes[x]

                // Verificando se ocorreu algum SPAM
                if(botao.innerText == 'Permitir todos os cookies'){
                    return true
                }else{
                    return false
                }
            }
        })

        if(aceitarCookie == true){
            // Verificando se existe algum spam
            logs.push(usuario + ' - Aceitando os cookies.')

            await pagina.evaluate(()=>{
                document.querySelectorAll('button').forEach((e)=>{
                    if(e.innerText == 'Permitir todos os cookies'){
                        e.click()
                    }
                })
            })
            await pagina.waitForTimeout(5000)
        }

        logs.push(usuario + ' - Esperando os dados aparecerem.')
        await pagina.waitForSelector('._acan._acao._acas')

        const resultado = await pagina.evaluate(()=>{
            if(document.querySelector('img[alt="Alterar foto do perfil"]') || document.querySelector('img[alt="Change profile photo"]')){
                return 'alterar'
            }else{
                return 'adicionar'
            }
        })

        logs.push(usuario + ' - Alterando a foto de perfil.')
        if(resultado == 'adicionar'){
            const [ instaUploadProfile ] = await Promise.all([
                pagina.waitForFileChooser(),
                await pagina.waitForSelector('button._acan._acao._acas'),
                await pagina.click('button._acan._acao._acas')
            ])
            
            await instaUploadProfile.accept([ fotoPerfil ])
        }else if('alterar'){

            await pagina.waitForSelector('button._acan._acao._acas')
            await pagina.click('button._acan._acao._acas')

            const [ instaUploadProfile ] = await Promise.all([
                pagina.waitForFileChooser(),
                await pagina.waitForSelector('button._a9--._a9_0'),
                await pagina.click('button._a9--._a9_0')
            ])
            
            await instaUploadProfile.accept([ fotoPerfil ])
        }
        await pagina.waitForTimeout(3000)
        await pagina.waitForSelector('._ab5p')
        await pagina.click('._ab5p')
        await pagina.waitForTimeout(5000)
        logs.push(usuario + ' - Foto de perfil alterada com sucesso!')
 
        return true 
    }catch(erro){
        console.log(erro.message)
        if(contador == 3){
            logs.push(usuario + ' - Erro ao tentar alterar a foto de perfil!')
            contador = 0
            return false
        }else{
            logs.push(usuario + ' - Não conseguimos alterar a foto de perfil, mas iremos tentar novamente.')
            contador = contador + 1
            await alterarFotoPerfil(pagina, usuario, pastaFotos, logs)
            contador = 0
            return false
        }
    }
}

module.exports = alterarFotoPerfil