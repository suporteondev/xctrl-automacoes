const capturarCodigo = async(identificador, pagina, logs)=>{
    try{
        // Trazendo a página para frente e aguardando até 2 minutos para o código chegar
        logs.push('Capturando o código')
        await pagina.bringToFront()

        logs.push(`perfil ${identificador} - ` + 'Aguardando o código chegar.')
        await pagina.waitForSelector('.subject--text.subject-text-js', { timeout: 120000 })

        // Capturando o código
        logs.push(`perfil ${identificador} - ` + 'Capturando o código')
        const codigo = await pagina.evaluate(()=>{
            return document.querySelector('.subject--text.subject-text-js').innerText.substring(0, 6)
        })

        // Retornando o código
        logs.push(`perfil ${identificador} - ` + 'Código capturado com sucesso')

        return{
            ok: true,
            codigo: codigo
        }
    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar capturar o código.')
        return{
            ok: false
        }
    }
    
}

module.exports = capturarCodigo