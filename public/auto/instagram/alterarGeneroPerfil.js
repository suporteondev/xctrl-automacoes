var contador = 1

const alterarGeneroPerfil = async(pagina, usuario, generoPerfis, logs)=>{
    try{

        logs.push('Alterando o gênero do perfil')

        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/accounts/edit/', { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }
        
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

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
                await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }
            
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