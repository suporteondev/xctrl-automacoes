// Meus imports
const Perfil = require('../../../models/perfil')

// Acessar perfil
const capturarDados = async(pagina, ref, usuario, senha, contador, logs)=>{
    try{
        
        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`)
        
        try{
            await pagina.waitForSelector('._ac2a._ac2b', { timeout: 5000 })
        }catch(erro){
            
        }

        // Capturando dados
        logs.push(usuario + ' - Verificando o perfil.')
        const dados = await pagina.evaluate(()=>{

            // Capturando as referência das publicações, dos seguidores e seguindo
            const publicacoes = document.querySelectorAll('._ac2a._ac2b')[0]
            const seguidores = document.querySelectorAll('._ac2a._ac2b')[1]
            const seguindo = document.querySelectorAll('._ac2a._ac2b')[2]
            const titulos = document.querySelectorAll('h2')
            let resultado = true

            // Verificando se o perfil está inativo
            for(let x = 0; x < titulos.length; x++){
                const titulo = titulos[x]
                if(titulo.innerText == 'Esta página não está disponível.' || titulo.innerText == "Sorry, this page isn't available."){
                    return false
                }else if(titulo.innerText == 'Erro' || titulo.innerText == 'Error'){
                    return 'Tente novamente'
                }
            }

            // Retornando os dados
            return {
                publicacoes: publicacoes.innerText,
                seguidores: seguidores.innerText,
                seguindo: seguindo.innerText
            }
        })

        if(dados == 'Tente novamente'){
            logs.push('Pela quantidade de contas verificadas ao mesmo tempo, o instagram não está mais permitindo chamadas na url. Mude o perfil que está verificando as demais e tente novamente.')
            return false
        }

        if(dados == false){
            logs.push(usuario + ' - Perfil inativo!')
            return {
                ref: ref,
                usuario: usuario,
                senha: senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                status: 'inativo'
            }
        }
    
        logs.push(usuario + ' - Perfil ativo!')
    
        return {
            ref: ref,
            usuario: usuario,
            senha: senha,
            publicacoes: dados.publicacoes,
            seguidores: dados.seguidores,
            seguindo: dados.seguindo,
            status: 'ativo'
        }
    }catch(erro){
        console.log(erro.message)
        logs.push('')
        logs.push(usuario + ' - Tente novamente!')
        
        // Verificando se o usuário passado já existe no banco de dados
        const existe = await Perfil.findOne({ ref: ref, usuario: usuario })
                
        // Se o perfil existir retorna false
        if(existe){
            await Perfil.findOneAndUpdate({ ref: ref, usuario: usuario }, {
                ref: ref,
                usuario: usuario,
                senha: senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                status: 'novamente',
            })
        }else{
            await Perfil.create({
                ref: ref,
                usuario: usuario,
                senha: senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                status: 'novamente'
            })
        }
    }
}

module.exports = capturarDados

