var contadorAcoesRealizadas = 0

const realizarAcoesGNR = async(navegador, pagina, paginaInstagram, quantidadeAcoes, usuario, logs)=>{
    try{

        logs.push('Realizando ações na plataforma')
        
        for(let x = 0; x < 7500; x++){

            if(contadorAcoesRealizadas == quantidadeAcoes){
                logs.push(usuario + ' - Meta de ações concluída')
                break
            }

            logs.push(usuario + ' - Buscando ações')
            await pagina.bringToFront()
            await pagina.waitForSelector('[id="btn-acessar"]', { timeout: 240000 })
            const { href, acao } = await pagina.evaluate(()=>{
                return {
                    href: document.querySelector('[id="btn-acessar"]').href,
                    acao: document.querySelector('[id="btn-acessar"]').innerText
                }
            })

            await pagina.click('[id="btn-acessar"]')
            await pagina.waitForTimeout(2000)
            const paginas = await navegador.pages()
            const pagina2 = paginas[paginas.length - 1]
            await pagina2.close()

            if(acao == 'Acessar Perfil'){
                logs.push(usuario + ' - Ação de seguir encontrada!')
                await paginaInstagram.bringToFront()
                logs.push(usuario + ' - Acessando o perfil')
                await paginaInstagram.goto(href)
                logs.push(usuario + ' - Seguindo o perfil')
                await paginaInstagram.waitForSelector('._acan._acap._acas')
                await paginaInstagram.click('._acan._acap._acas')
                logs.push(usuario + ' - Perfil seguido')
                await pagina.bringToFront()
                logs.push(usuario + ' - Confirmando ação')
                await pagina.click('[id="btn-confirmar"]')
                logs.push(usuario + ' - Ação realizada com sucesso!')
                logs.push('O saldo de R$0,006 foi adicionados a sua carteira!')
                contadorAcoesRealizadas ++
            }else{
                logs.push(usuario + ' - Ação de curtir encontrada')
                await paginaInstagram.bringToFront()
                logs.push(usuario + ' - Acessando a publicação')
                await paginaInstagram.goto(href)
                logs.push(usuario + ' - Curtindo a publicação')
                await paginaInstagram.waitForSelector('[aria-label="Curtir"]')
                await paginaInstagram.click('[aria-label="Curtir"]')
                logs.push(usuario + ' - Publicação curtida com sucesso!')
                await pagina.bringToFront()
                logs.push(usuario + ' - Confirmando ação')
                await pagina.click('[id="btn-confirmar"]')
                logs.push(usuario + ' - Ação realizada com sucesso!')
                logs.push('O saldo de R$0,003 foi adicionados a sua carteira!')
                contadorAcoesRealizadas++
            }
        }

        contadorAcoesRealizadas = 0
        return true

    }catch(erro){
        console.log(erro.message)
        logs.push(usuario + ' - Perfil sem ações!')
        contadorAcoesRealizadas = 0
        return false
    }
}

module.exports = realizarAcoesGNR