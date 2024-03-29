const fs = require('fs')
var publicacoesEscolhidas = []

const realizarPublicacoesFeed = async(pagina, x, usuario, pastaFotos, logs)=>{
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
        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado a ${x}ª publicação.`)
        try{
            const [ uploadPublicacoes ] = await Promise.all([
                pagina.waitForFileChooser(),
                pagina.waitForSelector('svg[aria-label="Nova publicação"]'),
                pagina.click('svg[aria-label="Nova publicação"]')
            ])

            await uploadPublicacoes.accept([ publicacao ])
        }catch(erro){

            await pagina.click('[d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"]')
            d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
            await pagina.waitForTimeout(2000)

            const [ uploadPublicacoes ] = await Promise.all([
                pagina.waitForFileChooser(),
                pagina.waitForSelector('[aria-label="Publicar"]'),
                pagina.click('[aria-label="Publicar"]')
            ])

            await uploadPublicacoes.accept([ publicacao ])
        }

        //Avançar
        logs.push(usuario + ' - Avançando.')
        await pagina.waitForSelector('button._ab5p', { timeout: 60000 })
        await pagina.click('button._ab5p')

        // Compartilhar
        logs.push(usuario + ' - Compartilhando.')
        await pagina.waitForSelector('textarea[aria-label="Escreva uma legenda..."]', { timeout: 60000 })
        await pagina.click('button._ab5p')

        // Esperando aparecer o botão de Nova publicação
        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })
        logs.push(usuario + ' - Publicação realizada com sucesso!')

        return true
    }catch(erro){
        console.log(erro.message)
        try{
            logs.push(usuario + ` - Não conseguimos realizar a ${x} publicação, mas iremos tentar novamente.`)
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
            await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

            // Selecionando a publicação
            logs.push(`${usuario} - Selecionado a ${x}ª publicação.`)
            try{
                const [ uploadPublicacoes ] = await Promise.all([
                    pagina.waitForFileChooser(),
                    pagina.waitForSelector('svg[aria-label="Nova publicação"]'),
                    pagina.click('svg[aria-label="Nova publicação"]')
                ])
    
                await uploadPublicacoes.accept([ publicacao ])
            }catch(erro){

                await pagina.click('[d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"]')
                await pagina.waitForTimeout(2000)

                const [ uploadPublicacoes ] = await Promise.all([
                    pagina.waitForFileChooser(),
                    pagina.waitForSelector('[aria-label="Publicar"]'),
                    pagina.click('[aria-label="Publicar"]')
                ])
    
                await uploadPublicacoes.accept([ publicacao ])
            }

            //Avançar
            logs.push(usuario + ' - Avançando.')
            await pagina.waitForSelector('button._ab5p', { timeout: 60000 })
            await pagina.click('button._ab5p')

            // Compartilhar
            logs.push(usuario + ' - Compartilhando.')
            await pagina.waitForSelector('textarea[aria-label="Escreva uma legenda..."]', { timeout: 60000 })
            await pagina.click('button._ab5p')

            // Esperando aparecer o botão de Nova publicação
            await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })
            logs.push(usuario + ' - Publicação realizada com sucesso!')

            return true 
        }catch(erro){
            console.log(erro.message)
            logs.push(usuario + ` - Erro ao tentar publicar a ${x} publicação!`)
            return false
        }

    }
}

module.exports = realizarPublicacoesFeed