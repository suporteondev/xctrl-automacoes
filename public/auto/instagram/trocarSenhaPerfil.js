const procurarBloqueios = require("./procurarBloqueios")
const Perfil = require('../../models/perfil')
const Store = require('electron-store')
const store = new Store()

const trocarSenhaPerfil = async(pagina, usuario, senha, novaSenha, logs)=>{

    const { email: ref } = store.get('usuarioLogado')

    try{

        logs.push('Trocando a senha do perfil')
        await pagina.goto('https://www.instagram.com/accounts/password/change/', { timeout: 60000 })

        logs.push(usuario + ' - Digitando a senha antiga')
        await pagina.waitForSelector('input[name="cppOldPassword"]')
        await pagina.type('input[name="cppOldPassword"]', senha)

        logs.push(usuario + ' - Digitando a nova senha')
        await pagina.waitForSelector('input[name="cppNewPassword"]')
        await pagina.type('input[name="cppNewPassword"]', novaSenha)

        logs.push(usuario + ' - Confirmando a nova senha')
        await pagina.waitForSelector('input[name="cppConfirmPassword"]')
        await pagina.type('input[name="cppConfirmPassword"]', novaSenha)

        logs.push(usuario + ' - Salvando alterações')
        await pagina.waitForSelector('button.sqdOP.L3NKy.y3zKF')
        await pagina.click('button.sqdOP.L3NKy.y3zKF')
        await pagina.waitForTimeout(5000)

        logs.push(usuario + ' - Senha alterada com sucesso!')

        logs.push(usuario + ' - Atualizando a senha do perfil no gerenciador...')
        await Perfil.findOneAndUpdate({ ref, usuario}, { senha: novaSenha })
        logs.push(usuario + ' - Senha atualizada com sucesso!')
        return true

    }catch(erro){
        console.log(erro.message)
        logs.push(usuario + ' - Não conseguimos alterar a senha desse perfil, iremos tentar novamente!')
        try{
            logs.push('Trocando a senha do perfil')
            await pagina.goto('https://www.instagram.com/accounts/password/change/', { timeout: 60000 })

            logs.push(usuario + ' - Digitando a senha antiga')
            await pagina.waitForSelector('input[name="cppOldPassword"]')
            await pagina.type('input[name="cppOldPassword"]', senha)

            logs.push(usuario + ' - Digitando a nova senha')
            await pagina.waitForSelector('input[name="cppNewPassword"]')
            await pagina.type('input[name="cppNewPassword"]', novaSenha)

            logs.push(usuario + ' - Confirmando a nova senha')
            await pagina.waitForSelector('input[name="cppConfirmPassword"]')
            await pagina.type('input[name="cppConfirmPassword"]', novaSenha)

            logs.push(usuario + ' - Salvando alterações')
            await pagina.waitForSelector('button.sqdOP.L3NKy.y3zKF')
            await pagina.click('button.sqdOP.L3NKy.y3zKF')
            await pagina.waitForTimeout(5000)

            logs.push(usuario + ' - Senha alterada com sucesso!')
            logs.push(usuario + ' - Atualizando a senha do perfil no gerenciador...')
            await Perfil.findOneAndUpdate({ ref, usuario }, { senha: novaSenha })
            logs.push(usuario + ' - Senha atualizada com sucesso!')
            return true 
        }catch(erro){
            console.log(erro.message)
            logs.push(usuario + ' - Não conseguimos alterar a senha desse perfil!')
            return false
        }
    }
}

module.exports = trocarSenhaPerfil