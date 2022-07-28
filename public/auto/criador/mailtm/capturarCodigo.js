const capturarCodigo = async(identificador, pagina, logs)=>{
    try{
        // Trazendo a página para frente e aguardando até 2 minutos para o código chegar
        logs.push('Capturando o código')
        await pagina.bringToFront()

        logs.push(`perfil ${identificador} - ` + 'Aguardando o código chegar.')
        await pagina.waitForSelector('ul li a', { timeout: 60000 })

        // Capturando o código
        logs.push(`perfil ${identificador} - ` + 'Capturando o código')
        await pagina.click('ul li a')

        await pagina.waitForSelector('[class="focus:ring-blue dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-gray dark:focus:border-gray-700 inline-flex items-center px-4 py-2 dark:text-gray-300 hover:text-gray-500 text-gray-700 active:text-gray-800 text-sm font-medium leading-5 active:bg-gray-50 dark-active:bg-gray-700 dark:bg-gray-800 bg-white border focus:border-blue-300 border-gray-300 dark:border-transparent rounded-md focus:outline-none transition"]')
        const codigo = await pagina.evaluate(()=>{
            return document.querySelector('h2').innerText.split(' ')[0]
        })

        // Retornando o código
        logs.push(`perfil ${identificador} - ` + 'Código capturado com sucesso')

        return{
            ok: true,
            codigo: codigo
        }
    }catch(erro){
        console.log(erro.message)
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar capturar o código.')
        return{
            ok: false
        }
    }
    
}

module.exports = capturarCodigo