const verPerfisDesativados = async(pagina)=>{

    global.removerperfisgni.push('Capturando informações')
    global.removerperfisgni.push('Acessando a gerência de perfis')
    await pagina.goto('https://www.ganharnoinsta.com/painel/?pagina=gerenciar_contas', { timeout: 60000 })

    global.removerperfisgni.push('Procurando perfis desativados')
    await pagina.waitForSelector('input[type="search"]', { timeout: 60000 })
    await pagina.type('input[type="search"]', 'Reativar Conta', { timeout: 60000 })

    try{
        await pagina.waitForSelector('a[class="btn btn-danger btn-sm"]', { timeout: 60000 })
        global.removerperfisgni.push('Perfis desativados encontrados')
    }catch(erro){
        return global.removerperfisgni.push('Você não possui nenhum perfil desativado!')
    }

    const { totalDesativados, totalSaldo } = await pagina.evaluate(()=>{

        const perfisDesativados = document.querySelectorAll('tbody td:nth-child(3)')
        let totalSaldo = 0
        let totalPerfis = 0

        perfisDesativados.forEach((perfil)=>{
            totalSaldo = totalSaldo + Number(perfil.innerText.split(' ')[4].replace(',', '.'))
            totalPerfis = totalPerfis + 1
        })

        return {
            totalDesativados: totalPerfis,
            totalSaldo: totalSaldo
        }
    })

    global.removerperfisgni.push('Perfis desativados: ' + totalDesativados)
    global.removerperfisgni.push('Saldo a ser perdido: ' + totalSaldo.toFixed(2))
    
}

module.exports = verPerfisDesativados