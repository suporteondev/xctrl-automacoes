const fs = require('fs')
const limpandoLogin = require('./limpandoLogin')
const Perfil = require('../../../models/perfil')
const Store = require('electron-store')
const store = new Store()

const digitandoCodigo = async(
    identificador, 
    pagina, 
    comoSalvar,
    ondeSalvar,
    usuario, 
    senha, 
    codigo,
    limparLoginConfigurado, 
    logs
)=>{
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

        // Esperando a página carregar
        logs.push(`perfil ${identificador} - ` + 'Esperando a página carregar')
        await pagina.waitForNavigation({ timeout: 45000 })

        // Esperando o direct aparecer
        logs.push(`perfil ${identificador} - ` + 'Esperando o direct aparecer')
        await pagina.waitForSelector('[aria-label="Página inicial"]')

        logs.push(`perfil ${identificador} - ` + 'Perfil criado com sucesso!')

        if(comoSalvar == 'linha'){
            fs.appendFile(ondeSalvar, `\n${usuario} ${senha}`, function(err){
                if(err){
                    console.log(err)
                }
                console.log('Atualizado!')
            })
        }else if(comoSalvar == 'coluna'){
            fs.appendFile(ondeSalvar, `\n\n${usuario}\n${senha}`, function(err){
                if(err){
                    console.log(err)
                }
                console.log('Atualizado!')
            })
        }else if(comoSalvar == 'gerenciador'){
            await Perfil.create({
                ref: store.get('logado'),
                usuario: usuario,
                senha: senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                status: 'ativo'
            })
        }

        if(limparLoginConfigurado == true){
            await limpandoLogin(pagina, identificador, logs)
        }

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