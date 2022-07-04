const publicarFotos = async(pagina, usuario, publicacoes, logs)=>{

    if(publicacoes == false) return true
    logs.push('Publicando fotos no feed')
    
    logs.push(usuario + ' - Redirecionando para o perfil.')
    // Acessar o perfil do usuário
    try{
        await pagina.goto(`https://www.instagram.com/${usuario}/`)
    }catch(erro){
        await pagina.goto(`https://www.instagram.com/${usuario}/`)
    }

    // Capturando o total de publicações
    var totalPublicacoes = publicacoes.length;

    // Criando a função de postar
    async function postarNoFeed(){

        // Criando um contador para verificar quantas publicações já foram
        let y = null

        try{
            // Realizando as publicações
            for(y = 0; y < totalPublicacoes; y++) {
                try{
                    await pagina.goto(`https://www.instagram.com/${usuario}/`)

                    // Verificando se existe algum spam
                    let spam1 = await pagina.evaluate(()=>{

                        let refsH2 = document.querySelectorAll('h2')

                        for(let x = 0; x < refsH2.length; x++){

                            // Capturando o H2
                            const elemento = refsH2[x]

                            // Verificando se ocorreu algum SPAM
                            if(elemento.innerText == 'Sua publicação vai contra nossas Diretrizes da Comunidade'){
                                return true
                            }else{
                                return false
                            }
                        }
                    })

                    if(spam1 == true){

                        // Clicando no botão do spam
                        await pagina.evaluate(()=>{
                            document.querySelectorAll('button').forEach((e)=>{
                                if(e.innerText == 'OK'){
                                    e.click()
                                }
                            })
                        })

                        // Spam
                        logs.push(usuario + ' - A publicação sofreu spam.')
                        await pagina.waitForSelector('a[href="/accounts/edit/"]')

                        throw new Error('Spam')
                    }

                    // Esperando aparecer o botão de publicar fotos no feed
                    await pagina.waitForSelector('svg[aria-label="Nova publicação"]')

                    // Selecionando a publicação
                    logs.push(`${usuario} - Selecionado publicação.`)
                    const [ uploadPublicacoes ] = await Promise.all([
                        pagina.waitForFileChooser(),
                        pagina.waitForSelector('svg[aria-label="Nova publicação"]'),
                        pagina.click('svg[aria-label="Nova publicação"]')
                    ])

                    await uploadPublicacoes.accept([ publicacoes[y] ])

                    //Avançar
                    logs.push(usuario + ' - Avançando.')
                    await pagina.waitForSelector('button.UP43G')
                    await pagina.click('button.UP43G')

                    // Compartilhar
                    logs.push(usuario + ' - Compartilhando.')
                    await pagina.waitForSelector('textarea[aria-label="Escreva uma legenda..."]')
                    await pagina.click('button.UP43G')

                    // Esperando aparecer o botão de nova publicação
                    await pagina.waitForSelector('svg[aria-label="Nova publicação"]')

                    // Se não for a primeira publicação, ele redireciona para o perfil do usuário
                    await pagina.goto(`https://www.instagram.com/${usuario}/`)
                    
                    logs.push(`${usuario} - ${y + 1}ª publicação realizada com sucesso!`)
                }catch(erro){
                    console.log('Erro ao tentar publicar fotos: ' + erro.message)
                    logs.push(`${usuario} - Não conseguimos realizar a publicação!`)
                    continue
                }
            }
        }catch(erro){
            if(y == totalPublicacoes){
                return true
            }else{
                await postarNoFeed()
            }
        }
    }

    // Chamando a função postarNoFeed
    await postarNoFeed()

    return true

}

module.exports = publicarFotos