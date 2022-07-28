var contador = 1

const alterarGeneroPerfil = async(pagina, usuario, generoPerfis, logs)=>{
    try{

        logs.push('Alterando o gênero do perfil')

        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/accounts/edit/', { timeout: 60000 })
        
        logs.push(usuario + ' - Clicando nos gêneros.')
        await pagina.waitForSelector('input[id="pepGender"]', { timeout: 60000 })
        await pagina.click('input[id="pepGender"]')
        await pagina.waitForTimeout(2000)
        
        logs.push(usuario + ' - Alterando o gênero para ' + generoPerfis + '.')
        await pagina.evaluate((generoPerfis)=>{
            generoPerfis === 'masculino' ? 
            document.querySelectorAll('[name="gender"]')[0].click() :
            document.querySelectorAll('[name="gender"]')[1].click()
        }, generoPerfis)
        await pagina.waitForTimeout(2000)

        logs.push(usuario + ' - Confirmando gênero.')
        await pagina.waitForSelector('._ac76 button._acan._acao._acas', { timeout: 60000 })
        await pagina.click('._ac76 button._acan._acao._acas')
        logs.push(usuario + ' - Gênero alterado com sucesso.')
        
        await pagina.waitForTimeout(5000)
     
        contador = 1
        return true 
    }catch(erro){
        try{
            logs.push(usuario + ' - Não conseguimos alterar o gênero dos perfis mas iremos tentar novamente.')
            logs.push('Alterando o gênero do perfil')
            logs.push(usuario + ' - Redirecionando para o perfil.')
            await pagina.goto('https://www.instagram.com/accounts/edit/', { timeout: 60000 })
            
            logs.push(usuario + ' - Clicando nos gêneros.')
            await pagina.waitForSelector('input[id="pepGender"]', { timeout: 60000 })
            await pagina.click('input[id="pepGender"]')
            await pagina.waitForTimeout(2000)
            
            logs.push(usuario + ' - Alterando o gênero para ' + generoPerfis + '.')
            await pagina.evaluate((generoPerfis)=>{
                generoPerfis === 'masculino' ? 
                document.querySelectorAll('[name="gender"]')[0].click() :
                document.querySelectorAll('[name="gender"]')[1].click()
            }, generoPerfis)
            await pagina.waitForTimeout(2000)

            logs.push(usuario + ' - Confirmando gênero.')
            await pagina.waitForSelector('._ac76 button._acan._acao._acas', { timeout: 60000 })
            await pagina.click('._ac76 button._acan._acao._acas')
            logs.push(usuario + ' - Gênero alterado com sucesso.')
            
            await pagina.waitForTimeout(5000)
        
            contador = 1
            return true 
        }catch(erro){
            logs.push(usuario + ' - Erro ao tentar alterar o gênero do perfil!')
            return false
        }
    }
}

module.exports = alterarGeneroPerfil