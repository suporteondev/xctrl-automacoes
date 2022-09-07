const Store = require('electron-store')
const Engajamento = require('../../models/engajamento')
const store = new Store()

const capturarCookie = async(pagina, novoArrayPerfisEngajamentos, usuario, senha, data, logs)=>{
    
    const { email: ref } = store.get('usuarioLogado')
    const cookie = await pagina.cookies()
    const userAgent = await pagina.evaluate(() => navigator.userAgent )

    try{

        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`)

        // Esperando o direct aparecer
        logs.push(usuario + ' - Verificando o perfil.')
        await pagina.waitForSelector('[aria-label="Página inicial"]')
        
        // Capturando as informações do perfil
        const perfil = await pagina.evaluate(({ ref, usuario, senha, data, cookie, userAgent })=>{
            if(document.querySelectorAll('._ac2a._ac2b')){
                return {
                    ref,
                    status: 'Ativo',
                    usuario,
                    senha,
                    publicacoes: document.querySelectorAll('._ac2a._ac2b')[0].innerText,
                    seguidores: document.querySelectorAll('._ac2a._ac2b')[1].innerText,
                    seguindo: document.querySelectorAll('._ac2a._ac2b')[2].innerText,
                    data,
                    cookie,
                    userAgent
                }
            }

            return {
                ref,
                status: 'Tentar novamente',
                usuario,
                senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                data,
                cookie,
                userAgent
            }
        }, { ref, usuario, senha, data, cookie, userAgent })

        if(perfil.status == 'Ativo'){
            logs.push(usuario + ' - Perfil ativo!')
        }else if(perfil.status == 'Tentar novamente'){
            logs.push(usuario + ' - Tentar novamente!')
        }

        // ADICIONANDO O PERFIL NO ENGAJAMENTO
        const existe = await Engajamento.findOne({ ref, usuario })

        if(existe){
            await Engajamento.findOneAndUpdate({ ref, usuario}, perfil)
        }else{
            await Engajamento.create(perfil)
        }

        return true
        
    }catch(erro){
        logs.push(usuario + ' - Tentar novamente!')

        const perfil = {
            ref,
            status: 'Tentar novamente',
            usuario,
            senha,
            publicacoes: '0',
            seguidores: '0',
            seguindo: '0',
            data,
            cookie,
            userAgent
        }

        // ADICIONANDO O PERFIL NO ENGAJAMENTO
        const existe = await Engajamento.findOne({ ref, usuario })

        if(existe){
            await Engajamento.findOneAndUpdate({ ref, usuario }, perfil)
        }else{
            await Engajamento.create(perfil)
        }

        return true
    }
}

module.exports = capturarCookie