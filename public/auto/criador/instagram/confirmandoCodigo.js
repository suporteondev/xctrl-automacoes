const confirmandoCodigo = async(x, pagina, codigo)=>{
    try{
        
        // Esperando o seletor
        global.criador.push('Confirmando o código')
        await pagina.bringToFront()
        await pagina.waitForSelector('input[aria-label="Código de confirmação"]')

        // Digitando o código
        global.criador.push(`Perfil ${x} - ` + 'Digitando o código')
        await pagina.type('input[aria-label="Código de confirmação"]', codigo, { delay: 100 })

        // Confirmando o código
        global.criador.push(`Perfil ${x} - ` + 'Confirmando o código')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')
        
        // Esperando a página carregar
        global.criador.push(`Perfil ${x} - ` + 'Esperando a página carregar')
        await pagina.waitForNavigation({ timeout: 60000 })

        // Esperando o direct aparecer
        global.criador.push(`Perfil ${x} - ` + 'Esperando o direct aparecer')
        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

        global.criador.push(`Perfil ${x} - ` + 'Perfil criado com sucesso!')

        return {
            ok: true
        }
        
    }catch(erro){
        global.criador.push(`Perfil ${x} - ` + 'Erro ao tentar criar o Perfil.')
        return{
            ok: false
        }
    }
}

module.exports = confirmandoCodigo