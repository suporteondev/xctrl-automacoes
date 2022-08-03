var contador = 0

const seguirPerfisFamosos = async(pagina, usuario, seguirPerfis, esperarEntre, logs)=>{
    try{

        logs.push(`Seguindo perfis sugeridos`)
        
        // Acessando o instagram do famoso
        logs.push(`${usuario} - Acessando o explorer`)
        await pagina.goto('https://www.instagram.com/explore/people/', { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }

        // Esperando carregar
        logs.push(`${usuario} - Esperando carregar`)

        // Seguindo os perfis
        for(let x = 0; x < seguirPerfis; x++){
            try{

                const perfisSeguidos1 = await pagina.evaluate(()=>{
                    const perfis = document.querySelectorAll('._acan._acap')
                    var quantidadePerfisSeguidos = 0

                    perfis.forEach((perfil)=>{
                        if(perfil.innerText == 'Seguindo'){
                            quantidadePerfisSeguidos = quantidadePerfisSeguidos + 1
                        }
                    })

                    return quantidadePerfisSeguidos
                })

                logs.push(`${usuario} - Seguindo o ${x + 1}º perfil`)
                
                try{
                    await pagina.waitForSelector('._acan._acap._acas', { timeout: 60000 })
                }catch(erro){
                    logs.push(`${usuario} - Os perfis sugeridos acabaram, portanto iremos pular as ações de seguir.`)
                }

                // DESCENDO O SCROOL
                await pagina.evaluate(()=>{
                    const posicaoY = document.querySelector('._acan._acap._acas').getBoundingClientRect().y
                    document.querySelector('html').scrollBy(0, Number(posicaoY - 60))
                })

                await pagina.click('._acan._acap._acas')
                await pagina.waitForTimeout(2000)

                try{
                    await pagina.waitForSelector('._a9--._a9_1', {timeout: 3000})
                    await pagina.click('._a9--._a9_1')

                    logs.push(`${usuario} - Esse perfil sofreu restrição de seguir, portanto iremos pulá-lo!`)

                    break
                }catch(erro){
                    
                }

                const perfisSeguidos2 = await pagina.evaluate(()=>{
                    const perfis = document.querySelectorAll('._acan._acap')
                    var quantidadePerfisSeguidos = 0

                    perfis.forEach((perfil)=>{
                        if(perfil.innerText == 'Seguindo'){
                            quantidadePerfisSeguidos = quantidadePerfisSeguidos + 1
                        }
                    })

                    return quantidadePerfisSeguidos
                })

                if(perfisSeguidos1 == perfisSeguidos2){
                    if(contador < 3){
                        logs.push(`${usuario} - Esse perfil está privado, iremos tentar seguir outro.`)
                        x--
                        contador++
                        throw new Error('Erro de seguindo')
                    }else{
                        contador = 0
                        throw new Error()
                    }
                }

                contador = 0
                logs.push(`${usuario} - Perfil seguido com sucesso!`)

                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }
            }catch(erro){
                if(erro.message != 'Erro de seguindo'){
                    console.log(erro.message)
                    logs.push(`${usuario} - Não conseguimos seguir o ${x + 1}º perfil!`)
                }
            }
        }

        return true 
    }catch(erro){
        logs.push(usuario + ' - Erro ao tentar seguir os perfis!')
        return false
    }
}

module.exports = seguirPerfisFamosos