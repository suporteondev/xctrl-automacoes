const fs = require('fs')
var contador = 1

const postarFotoPerfil = async(pagina, usuario, pastaFotos, logs)=>{
    try{

        let fotoPerfil = ''

        fs.readdir(pastaFotos, function(erro, fotos){
            fotoPerfil = `${pastaFotos}\\${fotos[Math.floor(Math.random() * fotos.length)]}`
        })

        logs.push('Alterando a foto de perfil')
        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/accounts/edit/')

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
 
        contador = 1
        return true 
    }catch(erro){
        console.log(erro.message)

        try{
            logs.push(usuario + ' - Não conseguimos alterar a foto de perfil, mas iremos tentar novamente.')
            let fotoPerfil = ''

            fs.readdir(pastaFotos, function(erro, fotos){
                fotoPerfil = `${pastaFotos}\\${fotos[Math.floor(Math.random() * fotos.length)]}`
            })

            logs.push('Alterando a foto de perfil')
            logs.push(usuario + ' - Redirecionando para o perfil.')
            await pagina.goto('https://www.instagram.com/accounts/edit/')

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
            logs.push(usuario + ' - Erro ao tentar alterar a foto de perfil!')
            return false
        }        
    }
}

module.exports = postarFotoPerfil