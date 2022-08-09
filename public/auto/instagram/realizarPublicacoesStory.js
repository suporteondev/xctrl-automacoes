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

        pagina.on('dialog', async dialog => {
            try{
                await dialog.accept()
            }catch(erro){
            }
        }) 

        // ACESSANDO O PERFIL
        await pagina.goto('https://www.instagram.com/', { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado o ${x}ª story.`)
        try{
            const [ uploadPublicacoes ] = await Promise.all([
                pagina.waitForFileChooser(),
                pagina.waitForSelector('svg[aria-label="Novo story"]'),
                pagina.click('svg[aria-label="Novo story"]')
            ])

            await uploadPublicacoes.accept([ publicacao ])
        }catch(erro){
            await pagina.click('[d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"]')
            await pagina.waitForTimeout(2000)

            const [ uploadPublicacoes ] = await Promise.all([
                pagina.waitForFileChooser(),
                pagina.waitForSelector('svg[aria-label="Story"]'),
                pagina.click('svg[aria-label="Story"]')
            ])

            await uploadPublicacoes.accept([ publicacao ])
        }

        logs.push(`${usuario} - Publicando no story.`)
        await pagina.waitForSelector('[aria-label="Adicionar ao seu story"]', { timeout: 60000 })
        await pagina.click('[aria-label="Adicionar ao seu story"]')

        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })
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

            pagina.on('dialog', async dialog => {
                try{
                    await dialog.accept()
                }catch(erro){
                }
            }) 
 
            // ACESSANDO O PERFIL
            await pagina.goto('https://www.instagram.com/', { timeout: 60000 })

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
                await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }

            await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

            // Selecionando a publicação
            logs.push(`${usuario} - Selecionado o ${x}ª story.`)
            try{
                const [ uploadPublicacoes ] = await Promise.all([
                    pagina.waitForFileChooser(),
                    pagina.waitForSelector('svg[aria-label="Novo story"]'),
                    pagina.click('svg[aria-label="Novo story"]')
                ])
    
                await uploadPublicacoes.accept([ publicacao ])
            }catch(erro){
                await pagina.click('[d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"]')
                await pagina.waitForTimeout(2000)

                const [ uploadPublicacoes ] = await Promise.all([
                    pagina.waitForFileChooser(),
                    pagina.waitForSelector('svg[aria-label="Story"]'),
                    pagina.click('svg[aria-label="Story"]')
                ])
    
                await uploadPublicacoes.accept([ publicacao ])
            }

            logs.push(`${usuario} - Publicando no story.`)
            await pagina.waitForSelector('[aria-label="Adicionar ao seu story"]', { timeout: 60000 })
            await pagina.click('[aria-label="Adicionar ao seu story"]')
            
            await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })
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