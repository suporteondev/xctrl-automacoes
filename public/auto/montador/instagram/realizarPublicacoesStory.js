const fs = require('fs')
var contador = 1
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
        await pagina.goto('https://www.instagram.com/')
        await pagina.waitForSelector('svg[aria-label="Novo story"]')

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado o ${x}ª story.`)
        const [ uploadPublicacoes ] = await Promise.all([
            pagina.waitForFileChooser(),
            pagina.waitForSelector('svg[aria-label="Novo story"]'),
            pagina.click('svg[aria-label="Novo story"]')
        ])

        await uploadPublicacoes.accept([ publicacao ])

        logs.push(`${usuario} - Publicando no story.`)
        await pagina.waitForSelector('[aria-label="Adicionar ao seu story"]')
        await pagina.click('[aria-label="Adicionar ao seu story"]')
        await pagina.waitForSelector('svg[aria-label="Novo story"]')
        logs.push(`${usuario} - Story publicado com sucesso!`)

        contador = 1
        return true
    }catch(erro){
        if(contador == 3){
            logs.push(usuario + ` - Erro ao tentar publicar o ${x} story!`)
            contador = 1
            return false
        }else{
            logs.push(usuario + ` - Não conseguimos realizar a publicação do ${x} story, mas iremos tentar novamente.`)
            contador = contador + 1
            await realizarPublicacoesStory(pagina, x, usuario, pastaFotos, logs)
        }
    }
}

module.exports = realizarPublicacoesStory