const removerPerfis = async(pagina)=>{

    var saldoAtual = 0

    for(let x = 0;; x++){
        try{

            global.removedor.push('Procurando perfil desativado')
            global.removedor.push('Acessando a gerência de perfis')
            await pagina.goto('https://www.ganharnoinsta.com/painel/?pagina=gerenciar_contas', { timeout: 60000 })

            try{
                await pagina.waitForSelector('input[type="search"]', { timeout: 60000 })
                await pagina.type('input[type="search"]', 'Reativar Conta', { timeout: 60000 })
                await pagina.waitForSelector('a[class="btn btn-danger btn-sm"]', { timeout: 60000 })
            }catch(erro){
                global.removedor.push('Não encontramos perfis desativados!')
                break
            }

            const { href, usuario, valor } = await pagina.evaluate(()=>{
                return {
                    href: document.querySelector('[class="btn btn-danger btn-sm"]').href,
                    usuario: document.querySelector('tbody td a').innerText,
                    valor: Number(document.querySelector('tbody td:nth-child(3)').innerText.split(' ')[4].replace(',', '.'))
                }
            })

            saldoAtual = saldoAtual + valor
            global.removedor.push('Perfil encontrado: ' + usuario)
            global.removedor.push('Saldo perdido: ' + valor)

            await pagina.waitForTimeout(2000)
            global.removedor.push('Removendo o perfil')
            await pagina.goto(href, { timeout: 60000 })
            await pagina.waitForSelector('a[class="btn btn-danger btn-block"]', { timeout: 60000 })

            const href2 = await pagina.evaluate(()=>{
                return document.querySelector('a[class="btn btn-danger btn-block"]').href
            })

            await pagina.goto(href2, { timeout: 60000 })

            await pagina.waitForTimeout(1000)
            await pagina.waitForSelector('input[name="confirmar_exclusao"]', { timeout: 60000 })
            await pagina.click('input[name="confirmar_exclusao"]')

            await pagina.waitForTimeout(1000, { timeout: 60000 })
            await pagina.waitForSelector('input[name="confirmar_exclusao"]', { timeout: 60000 })
            await pagina.click('input[name="confirmar_exclusao_desativada"]')

            await pagina.waitForTimeout(1000)
            await pagina.waitForSelector('button[type="submit"]', { timeout: 60000 })
            await pagina.click('button[type="submit"]')

            await pagina.waitForTimeout(1000)
            await pagina.waitForSelector('[class="btn btn-block btn-primary"]', { timeout: 60000 })
            global.removedor.push('Perfil removido com sucesso!')
            global.removedor.push('Saldo total perdido: ' + saldoAtual.toFixed(2))

        }catch(erro){
            global.removedor.push('Erro ao tentar excluir o perfil')
            global.removedor.push('Vamos tentar novamente')
        }
    }
}

module.exports = removerPerfis