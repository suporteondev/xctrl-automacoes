const atalhos = require('../atalhos')

const fotoPerfil = async(pagina, perfil, usuario, contador, logs)=>{
    try{
        // Verificando se a foto de perfil está vazia e pulando
        if(perfil == false) return true

        logs.push('')
        logs.push('Alterando a foto de perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Redirecionando para o perfil.')
        await atalhos.acessar(pagina, 'https://www.instagram.com/' + usuario)

        // Apertando em editar conta
        logs.push(usuario + ' - Apertando em editar conta.')
        await atalhos.clicar(pagina, 'a[href="/accounts/edit/"]')

        // Esperando os dados aparecerem
        logs.push(usuario + ' - Esperando os dados aparecerem.')
        await pagina.waitForSelector('._acan._acao._acas')

        // Verificando se tem que alterar ou adicionar uma nova foto de perfil
        await pagina.waitForTimeout(2000)
        const resultado = await pagina.evaluate(()=>{
            if(document.querySelector('img[alt="Alterar foto do perfil"]')){
                return 'alterar'
            }else{
                return 'adicionar'
            }
        })

        if(resultado == 'alterar'){
            await atalhos.clicar(pagina, '._acan._acao._acas')

            logs.push(usuario + ' - Selecionando a foto de perfil.')
            const [ instaUploadProfile ] = await Promise.all([
                pagina.waitForFileChooser(),
                atalhos.clicar(pagina, 'button[class="_a9-- _a9_0"]')
            ]);

            await instaUploadProfile.accept([ perfil ]);
        }else if(resultado == 'adicionar'){
            // Selecionando a foto de perfil
            logs.push(usuario + ' - Selecionando a foto de perfil.')
            const [ instaUploadProfile ] = await Promise.all([
                pagina.waitForFileChooser(),
                atalhos.clicar(pagina,'button[type="button"]')
            ]);

            await instaUploadProfile.accept([ perfil ]);
        }

        // Postando a foto
        await pagina.waitForTimeout(2000)

        // Colocando modo retrato
        logs.push(usuario + ' - Colocando no modo retrato.')
        await pagina.evaluate(()=>{

            // Capturando a referência do erro
            const retrato = document.querySelector('.createSpriteExpand')
            
            // If existir um erro ele retorna qual foi
            if(retrato) retrato.click()
        })
        await pagina.waitForTimeout(3000)

        // Selecionando um efeito
        logs.push(usuario + ' - Selecionando um efeito.')
        await atalhos.clicar(pagina, 'button._ab5p')
        await pagina.waitForTimeout(2000)
        await pagina.evaluate(()=>{
            const efeitos = document.querySelectorAll('button.cwqzn.fq6ji > img')

            function sortearNumero(min, max){
                min = Math.ceil(min)
                max = Math.floor(max)
                return Math.floor(Math.random() * (max - min)) + min
            }

            for(let x = 0; x < efeitos.length; x++) {
                if(x == sortearNumero(0, efeitos.length)){
                    efeitos[x].click()
                }
            }
        })

        await pagina.waitForTimeout(2000)
        logs.push(usuario + ' - Publicando a foto de perfil.')
        await pagina.waitForTimeout(3000)
        await atalhos.acessar(pagina, 'https://www.instagram.com/' + usuario)
        logs.push(usuario + ' - Foto de perfil alterada com sucesso!')
        
        return true
    }catch(erro){
        console.log('Erro ao tentar publicar foto de perfil: ' + erro.message)
        if(contador < 3){

            logs.push(`${usuario} - Não conseguimos alterar a foto de perfil, mas não se preocupe, estamos tentando novamente!`)

            // Contador de erros
            contador = contador + 1
            
            // Tentando acessar novamente
            return await fotoPerfil(pagina, perfil, usuario, contador, logs)
            
        }else{
            logs.push(`${usuario} - Não conseguimos alterar a foto de perfil.`)
            return false
        }
    }
}

module.exports = fotoPerfil