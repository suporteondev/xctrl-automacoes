const Store = require('electron-store')
const store = new Store()

const capturarCookie = async(pagina, novoArrayPerfisEngajamentos, usuario, senha, data, logs)=>{
    
    let cookies = await pagina.cookies()
    let userAgent = await pagina.evaluate(() => navigator.userAgent )

    try{

        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`)

        // Esperando o direct aparecer
        logs.push(usuario + ' - Verificando o perfil.')
        await pagina.waitForSelector('[aria-label="Página inicial"]')
        
        // Capturando as informações do perfil
        const perfil = await pagina.evaluate(({ usuario, senha, data, cookies, userAgent })=>{
            if(document.querySelectorAll('._ac2a._ac2b')){
                return {
                    status: 'Ativo',
                    usuario,
                    senha,
                    publicacoes: document.querySelectorAll('._ac2a._ac2b')[0].innerText,
                    seguidores: document.querySelectorAll('._ac2a._ac2b')[1].innerText,
                    seguindo: document.querySelectorAll('._ac2a._ac2b')[2].innerText,
                    data,
                    cookies,
                    userAgent
                }
            }

            return {
                status: 'Tentar novamente',
                usuario,
                senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                data,
                cookies,
                userAgent
            }
        }, { usuario, senha, data, cookies, userAgent })

        if(perfil.status == 'Ativo'){
            logs.push(usuario + ' - Perfil ativo!')
        }else if(perfil.status == 'Tentar novamente'){
            logs.push(usuario + ' - Tentar novamente!')
        }

        for(let x = 0; x < novoArrayPerfisEngajamentos.length; x++) {
            // ATUALIZANDO OS DADOS DO PERFIL
            if(novoArrayPerfisEngajamentos[x].usuario.indexOf(usuario) >= 0){
                novoArrayPerfisEngajamentos[x] = perfil
                store.set('perfisEngajamentos', novoArrayPerfisEngajamentos)
                return true
            }
        }

        // ADICIONANDO O PERFIL
        novoArrayPerfisEngajamentos.push(perfil)
        store.set('perfisEngajamentos', novoArrayPerfisEngajamentos)

        return true
        
    }catch(erro){
        console.log(erro.message)
        logs.push(usuario + ' - Tentar novamente!')
        return true
    }
}

module.exports = capturarCookie