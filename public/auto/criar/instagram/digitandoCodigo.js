const acessarInstagram = require('./acessarInstagram')

const digitandoCodigo = async(ref, identificador, pagina, usuario, senha, codigo, logs)=>{
    try{
        
        // Esperando o seletor
        logs.push('Confirmando o código')
        await pagina.bringToFront()
        await pagina.waitForSelector('input[aria-label="Código de confirmação"]')

        // Digitando o código
        logs.push(`perfil ${identificador} - ` + 'Digitando o código')
        await pagina.type('input[aria-label="Código de confirmação"]', codigo, { delay: 100 })

        // Confirmando o código
        logs.push(`perfil ${identificador} - ` + 'Confirmando o código')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')

        try{
            await pagina.waitForSelector('._7UhW9.xLCgt.MMzan.fDdiY.uL8Hv.l4b0S', { timeout: 60000 })
            logs.push(`perfil ${identificador} - ` + 'Ocorreu um erro ao tentar criar esse perfil.')

            // Acessando o perfil 
            const resultado = await acessarInstagram(pagina, usuario, senha, logs, identificador)

            if(resultado == true){
                logs.push(`perfil ${identificador} - ` + 'Perfil criado com sucesso!')
                return {
                    ok: true
                }
            }else if(resultado == false){
                logs.push(`perfil ${identificador} - ` + 'Erro ao tentar criar o perfil.')
                return {
                    ok: false
                }
            }
        }catch(erro){
            
        }
        

        // Esperando a página carregar
        logs.push(`perfil ${identificador} - ` + 'Esperando a página carregar')
        await pagina.waitForNavigation({ timeout: 60000 })

        // Esperando o direct aparecer
        logs.push(`perfil ${identificador} - ` + 'Esperando o direct aparecer')
        await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })

        logs.push(`perfil ${identificador} - ` + 'Perfil criado com sucesso!')

        return {
            ok: true
        }
        
    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar criar o perfil.')
        return{
            ok: false
        }
    }
}

module.exports = digitandoCodigo