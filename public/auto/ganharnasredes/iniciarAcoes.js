const iniciarAcoesGNR = async(pagina, usuario, logs)=>{
    try{

        logs.push('Iniciando as ações da plataforma')
        await pagina.bringToFront()
        await pagina.goto('https://www.ganharnasredes.com/painel/?pagina=sistema')

        logs.push(usuario + ' - Esperando carregar')
        await pagina.waitForSelector('[id="contaig"]')

        logs.push(usuario + ' - Selecionando o perfil')
        await pagina.evaluate((usuario)=>{
            const perfisCadastrados = document.querySelectorAll('[id="contaig"] option')
            for(let x = 0; x < perfisCadastrados.length; x++){
                const option = perfisCadastrados[x]
                if(option.innerText == usuario){
                    option.selected = true
                }
            }
        }, usuario)
        await pagina.waitForTimeout(3000)

        logs.push(usuario + ' - Iniciando as ações')
        await pagina.waitForSelector('[id="btn_iniciar"]')
        await pagina.click('[id="btn_iniciar"]')

        logs.push(usuario + ' - Ações iniciadas com sucesso!')

        return true

    }catch(erro){

        logs.push('Não conseguimos iniciar as ações!')

        return false
    }
}

module.exports = iniciarAcoesGNR