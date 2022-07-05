const capturarCodigoCryptogmail = async(x, pagina)=>{
    try{
        // Trazendo a página para frente e aguardando até 2 minutos para o código chegar
        global.criador.push('Capturando o código')
        await pagina.bringToFront()

        global.criador.push(`Perfil ${x} - ` + 'Aguardando o código chegar.')
        await pagina.waitForSelector('.subject--text.subject-text-js', { timeout: 60000 })

        // Capturando o código
        global.criador.push(`Perfil ${x} - ` + 'Capturando o código')
        const codigo = await pagina.evaluate(()=>{
            return document.querySelector('.subject--text.subject-text-js').innerText.substring(9, 15)
        })

        // Retornando o código
        global.criador.push(`Perfil ${x} - ` + 'Código capturado com sucesso')

        return{
            ok: true,
            codigo: codigo
        }
    }catch(erro){
        global.criador.push(`Perfil ${x} - ` + 'Erro ao tentar capturar o código.')
        return{
            ok: false
        }
    }
    
}

module.exports = capturarCodigoCryptogmail