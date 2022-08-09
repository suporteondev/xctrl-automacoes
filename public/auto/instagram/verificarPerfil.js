const Store = require('electron-store')
const store = new Store()

const verificarPerfil = async(pagina, novoArrayPerfisGerenciador, usuario, senha, data, logs)=>{
    
    try{
        
        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`)

        // Esperando o direct aparecer
        logs.push(usuario + ' - Verificando o perfil.')
        await pagina.waitForSelector('[aria-label="Página inicial"]')
        
        // Capturando as informações do perfil
        const perfil = await pagina.evaluate(({ usuario, senha, data })=>{
            const titulos = document.querySelectorAll('h2')

            for(let x = 0; x < titulos.length; x++){
                const titulo = titulos[x]
                if(titulo.innerText == 'Esta página não está disponível.'){ 
                    return {
                        status: 'Inativo',
                        usuario,
                        senha,
                        publicacoes: '0',
                        seguidores: '0',
                        seguindo: '0',
                        data
                    }
                }
            }

            if(document.querySelectorAll('._ac2a._ac2b')){
                return {
                    status: 'Ativo',
                    usuario,
                    senha,
                    publicacoes: document.querySelectorAll('._ac2a._ac2b')[0].innerText,
                    seguidores: document.querySelectorAll('._ac2a._ac2b')[1].innerText,
                    seguindo: document.querySelectorAll('._ac2a._ac2b')[2].innerText,
                    data
                }
            }

            return {
                status: 'Tentar novamente',
                usuario,
                senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                data
            }
        }, { usuario, senha, data })

        if(perfil.status == 'Ativo'){
            logs.push(usuario + ' - Perfil ativo!')
        }else if(perfil.status == 'Inativo'){
            logs.push(usuario + ' - Perfil inativo!')
        }else if(perfil.status == 'Tentar novamente'){
            logs.push(usuario + ' - Tentar novamente!')
        }

        for(let x = 0; x < novoArrayPerfisGerenciador.length; x++) {
            // ATUALIZANDO OS DADOS DO PERFIL
            if(novoArrayPerfisGerenciador[x].usuario.indexOf(usuario) >= 0){
                novoArrayPerfisGerenciador[x] = perfil
                store.set('perfisGerenciador', novoArrayPerfisGerenciador)
                return true
            }
        }

        // ADICIONANDO O PERFIL
        novoArrayPerfisGerenciador.push(perfil)
        store.set('perfisGerenciador', novoArrayPerfisGerenciador)

        return true
        
    }catch(erro){
        console.log(erro.message)
        
        const perfil = {
            status: 'Tentar novamente',
            usuario,
            senha,
            publicacoes: '0',
            seguidores: '0',
            seguindo: '0',
            data
        }

        logs.push(usuario + ' - Tentar novamente!')

        for(let x = 0; x < novoArrayPerfisGerenciador.length; x++) {
            // ATUALIZANDO OS DADOS DO PERFIL
            if(novoArrayPerfisGerenciador[x].usuario.indexOf(usuario) >= 0){
                novoArrayPerfisGerenciador[x] = perfil
                store.set('perfisGerenciador', novoArrayPerfisGerenciador)
                return true
            }
        }

        // ADICIONANDO O PERFIL
        novoArrayPerfisGerenciador.push(perfil)
        store.set('perfisGerenciador', novoArrayPerfisGerenciador)

        return true
    }
}

module.exports = verificarPerfil