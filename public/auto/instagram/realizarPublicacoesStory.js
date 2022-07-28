const fs = require('fs')
var publicacoesEscolhidas = []

const realizarPublicacoesStory = async(pagina, x, usuario, pastaFotos, logs)=>{
    try{
        
        // CAPTURANDO A PUBLICAÇÃO
        const publicacoes = fs.readdirSync(pastaFotos)
        let publicacao = ''
        async function selecionarPublicacao(){
            publicacoesEscolhidas.length == publicacoes.length ? publicacoesEscolhidas = [] : ''
            publicacao = `${pastaFotos}\\${publicacoes[Math.floor(Math.random() * publicacoes.length)]}`
            if(publicacoesEscolhidas.indexOf(publicacao) >=0){
                return selecionarPublicacao()
            }
            return publicacoesEscolhidas.push(publicacao)
        }
        await selecionarPublicacao()

        // ACESSANDO O PERFIL
        await pagina.goto('https://www.instagram.com/', { timeout: 60000 })
        await pagina.waitForSelector('svg[aria-label="Novo story"]', { timeout: 60000 })

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado o ${x}ª story.`)
        const [ uploadPublicacoes ] = await Promise.all([
            pagina.waitForFileChooser(),
            pagina.waitForSelector('svg[aria-label="Novo story"]'),
            pagina.click('svg[aria-label="Novo story"]')
        ])

        await uploadPublicacoes.accept([ publicacao ])

        logs.push(`${usuario} - Publicando no story.`)
        await pagina.waitForSelector('[aria-label="Adicionar ao seu story"]', { timeout: 60000 })
        await pagina.click('[aria-label="Adicionar ao seu story"]')
        await pagina.waitForSelector('svg[aria-label="Novo story"]', { timeout: 60000 })
        logs.push(`${usuario} - Story publicado com sucesso!`)

        return true
    }catch(erro){
        try{
            console.log(erro.message)
            logs.push(usuario + ` - Não conseguimos realizar a publicação do ${x} story, mas iremos tentar novamente.`)

            // CAPTURANDO A PUBLICAÇÃO
            const publicacoes = fs.readdirSync(pastaFotos)
            let publicacao = ''
            async function selecionarPublicacao(){
                publicacoesEscolhidas.length == publicacoes.length ? publicacoesEscolhidas = [] : ''
                publicacao = `${pastaFotos}\\${publicacoes[Math.floor(Math.random() * publicacoes.length)]}`
                if(publicacoesEscolhidas.indexOf(publicacao) >=0){
                    return selecionarPublicacao()
                }
                return publicacoesEscolhidas.push(publicacao)
            }
            await selecionarPublicacao()

            // ACESSANDO O PERFIL
            await pagina.goto('https://www.instagram.com/', { timeout: 60000 })
            await pagina.waitForSelector('svg[aria-label="Novo story"]', { timeout: 60000 })

            // Selecionando a publicação
            logs.push(`${usuario} - Selecionado o ${x}ª story.`)
            const [ uploadPublicacoes ] = await Promise.all([
                pagina.waitForFileChooser(),
                pagina.waitForSelector('svg[aria-label="Novo story"]'),
                pagina.click('svg[aria-label="Novo story"]')
            ])

            await uploadPublicacoes.accept([ publicacao ])

            logs.push(`${usuario} - Publicando no story.`)
            await pagina.waitForSelector('[aria-label="Adicionar ao seu story"]', { timeout: 60000 })
            await pagina.click('[aria-label="Adicionar ao seu story"]')
            await pagina.waitForSelector('svg[aria-label="Novo story"]', { timeout: 60000 })
            logs.push(`${usuario} - Story publicado com sucesso!`)

            return true
        }catch(erro){
            console.log(erro.message)
            logs.push(usuario + ` - Erro ao tentar publicar o ${x} story!`)
            return false
        }
        
    }
}

module.exports = realizarPublicacoesStory