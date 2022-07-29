const Store = require('electron-store')
const store = new Store()

const verificarPerfil = async(pagina, usuario, senha, logs)=>{
    try{
        
        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`, { timeout: 60000 })

        // Esperando o direct aparecer
        logs.push(usuario + ' - Verificando o perfil.')
       
        try{
            await pagina.waitForSelector('[aria-label="Página inicial"]', { timeout: 60000 })
        }catch(erro){
            
        }
        
        const dados = await pagina.evaluate(()=>{
            const titulos = document.querySelectorAll('h2')
            for(let x = 0; x < titulos.length; x++){
                const titulo = titulos[x]
                if(titulo.innerText == 'Esta página não está disponível.'){
                    return false
                }else if(titulo.innerText == 'Erro'){
                    return 'Tente novamente'
                }
            }

            return {
                publicacoes: document.querySelectorAll('._ac2a._ac2b')[0].innerText,
                seguidores: document.querySelectorAll('._ac2a._ac2b')[1].innerText,
                seguindo: document.querySelectorAll('._ac2a._ac2b')[2].innerText
            }
        })

        if(dados == 'Tente novamente'){
            logs.push('Pela quantidade de contas verificadas ao mesmo tempo, o instagram não está mais permitindo chamadas na url. Mude o perfil que está verificando as demais e tente novamente.')
            return false
        }

        // Capturando a data atual
        var dataAtual = new Date()
        let dia = dataAtual.getDate().toString().padStart(2, '0')
        let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0')
        let ano = dataAtual.getFullYear()

        // Dados do perfil
        const perfisGerenciador = store.get('perfisGerenciador')
        let novoArrayPerfisGerenciador = perfisGerenciador

        if(dados == false){

            for (let x = 0; x < novoArrayPerfisGerenciador.length; x++) {
                if(novoArrayPerfisGerenciador[x].usuario.indexOf(usuario) >= 0){
                    novoArrayPerfisGerenciador[x] = {
                        status: 'Inativo',
                        usuario,
                        senha,
                        publicacoes: '0',
                        seguidores: '0',
                        seguindo: '0',
                        data: `${dia}/${mes}/${ano}`
                    }

                    store.set('perfisGerenciador', novoArrayPerfisGerenciador)
                    logs.push(usuario + ' - Perfil inativo!')
                    return true
                }
            }

            novoArrayPerfisGerenciador.push({
                status: 'Inativo',
                usuario,
                senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                data: `${dia}/${mes}/${ano}`
            })

            store.set('perfisGerenciador', novoArrayPerfisGerenciador)
            logs.push(usuario + ' - Perfil inativo!')
            return true
        }else{

            for (let x = 0; x < novoArrayPerfisGerenciador.length; x++) {
                if(novoArrayPerfisGerenciador[x].usuario.indexOf(usuario) >= 0){
                    novoArrayPerfisGerenciador[x] = {
                        status: 'Ativo',
                        usuario,
                        senha,
                        publicacoes: dados.publicacoes,
                        seguidores: dados.seguidores,
                        seguindo: dados.seguindo,
                        data: `${dia}/${mes}/${ano}`
                    }

                    store.set('perfisGerenciador', novoArrayPerfisGerenciador)
                    logs.push(usuario + ' - Perfil ativo!')
                    return true
                }
            }

            novoArrayPerfisGerenciador.push({
                status: 'Ativo',
                usuario,
                senha,
                publicacoes: dados.publicacoes,
                seguidores: dados.seguidores,
                seguindo: dados.seguindo,
                data: `${dia}/${mes}/${ano}`
            })

            store.set('perfisGerenciador', novoArrayPerfisGerenciador)
            logs.push(usuario + ' - Perfil ativo!')
            return true
        }
    }catch(erro){
        console.log(erro.message)
        const perfisGerenciador = store.get('perfisGerenciador')
        let novoArrayPerfisGerenciador = perfisGerenciador

        for (let x = 0; x < novoArrayPerfisGerenciador.length; x++) {
            if(novoArrayPerfisGerenciador[x].usuario.indexOf(usuario) >= 0){
                novoArrayPerfisGerenciador[x] = {
                    status: 'Tentar novamente',
                    usuario,
                    senha,
                    publicacoes: '0',
                    seguidores: '0',
                    seguindo: '0',
                    data: `${dia}/${mes}/${ano}`
                }

                store.set('perfisGerenciador', novoArrayPerfisGerenciador)
                logs.push(usuario + ' - Tente novamente!')
                return true
            }
        }

        novoArrayPerfisGerenciador.push({
            status: 'Tentar novamente',
            usuario,
            senha,
            publicacoes: '0',
            seguidores: '0',
            seguindo: '0',
            data: `${dia}/${mes}/${ano}`
        })

        store.set('perfisGerenciador', novoArrayPerfisGerenciador)
        logs.push(usuario + ' - Tente novamente!')
        return true
    }
}

module.exports = verificarPerfil