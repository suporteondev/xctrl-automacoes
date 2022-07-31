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

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

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

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
                await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }

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