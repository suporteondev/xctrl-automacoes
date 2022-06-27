const acessarGNI = async(pagina, email, senha)=>{
    try{

        global.removerperfisgni.push('Acessando o GNI')
        await pagina.goto('https://www.ganharnoinsta.com/painel/')

        global.removerperfisgni.push('Digitando o usuário')
        await pagina.waitForSelector('input[name="email"]')
        await pagina.type('input[name="email"]', email)

        global.removerperfisgni.push('Digitando a senha')
        await pagina.waitForSelector('input[name="senha"]')
        await pagina.type('input[name="senha"]', senha)

        global.removerperfisgni.push('Acessando a plataforma')
        await pagina.waitForSelector('button[type="submit"]')
        await pagina.click('button[type="submit"]')

        global.removerperfisgni.push('Esperando a página carregar')
        await pagina.waitForNavigation()

        global.removerperfisgni.push('Plataforma acessada com sucesso')
        
    }catch(erro){
        global.removerperfisgni.push('Erro ao tentar acessar a plataforma')
    }
}

module.exports = acessarGNI