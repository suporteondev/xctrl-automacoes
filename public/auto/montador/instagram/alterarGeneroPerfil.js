var contador = 1

const alterarGeneroPerfil = async(pagina, usuario, generoPerfis, logs)=>{
    try{

        logs.push('Alterando o gênero do perfil')

        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/accounts/edit/', { timeout: 60000 })
        
        logs.push(usuario + ' - Clicando nos gêneros.')
        await pagina.waitForSelector('input[id="pepGender"]')
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
        await pagina.waitForSelector('._ac76 button._acan._acao._acas')
        await pagina.click('._ac76 button._acan._acao._acas')
        logs.push(usuario + ' - Gênero alterado com sucesso.')
        
        await pagina.waitForTimeout(5000)
     
        contador = 1
        return true 
    }catch(erro){
        if(contador == 3){
            logs.push(usuario + ' - Erro ao tentar alterar o gênero do perfil!')
            contador = 1
            return false
        }else{
            logs.push(usuario + ' - Não conseguimos alterar o gênero dos perfis mas iremos tentar novamente.')
            contador = contador + 1
            await alterarGeneroPerfil(pagina, usuario, generoPerfis, logs)
        }
    }
}

module.exports = alterarGeneroPerfil