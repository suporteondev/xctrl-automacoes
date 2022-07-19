const fs = require('fs')
var contador = 1
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
        await pagina.goto('https://www.instagram.com/' + usuario)
        await pagina.waitForSelector('svg[aria-label="Nova publicação"]')

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado a ${x}ª publicação.`)
        const [ uploadPublicacoes ] = await Promise.all([
            pagina.waitForFileChooser(),
            pagina.waitForSelector('svg[aria-label="Nova publicação"]'),
            pagina.click('svg[aria-label="Nova publicação"]')
        ])

        await uploadPublicacoes.accept([ publicacao ])

        //Avançar
        logs.push(usuario + ' - Avançando.')
        await pagina.waitForSelector('button._ab5p')
        await pagina.click('button._ab5p')

        // Compartilhar
        logs.push(usuario + ' - Compartilhando.')
        await pagina.waitForSelector('textarea[aria-label="Escreva uma legenda..."]')
        await pagina.click('button._ab5p')

        // Esperando aparecer o botão de Nova publicação
        await pagina.waitForSelector('svg[aria-label="Nova publicação"]')
        logs.push(usuario + ' - Publicação realizada com sucesso!')

        return true
    }catch(erro){
        if(contador == 3){
            logs.push(usuario + ` - Erro ao tentar publicar a ${x} publicação!`)
            contador = 0
            return false
        }else{
            logs.push(usuario + ` - Não conseguimos realizar a ${x} publicação, mas iremos tentar novamente.`)
            contador = contador + 1
            await realizarPublicacoesFeed(pagina, x, usuario, pastaFotos, logs)
            contador = 0
            return false
        }
    }
}

module.exports = realizarPublicacoesFeed