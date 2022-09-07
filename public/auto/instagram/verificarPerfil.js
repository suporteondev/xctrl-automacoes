const Perfil = require('../../models/perfil')
const Store = require('electron-store')
const store = new Store()

const verificarPerfil = async(pagina, novoArrayPerfisEngajamentos, usuario, senha, data, logs)=>{

    const { email: ref } = store.get('usuarioLogado')
    
    try{
        
        logs.push('Verificando o perfil')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Acessando o perfil.')
        await pagina.goto(`https://www.instagram.com/${usuario}`)

        // Esperando o direct aparecer
        logs.push(usuario + ' - Verificando o perfil.')
        await pagina.waitForSelector('[aria-label="Página inicial"]')
        
        // Capturando as informações do perfil
        const perfil = await pagina.evaluate(({ usuario, senha, data, ref })=>{
            const titulos = document.querySelectorAll('h2')

            for(let x = 0; x < titulos.length; x++){
                const titulo = titulos[x]
                if(titulo.innerText == 'Esta página não está disponível.'){ 
                    return {
                        ref,
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
                    ref,
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
                ref,
                status: 'Tentar novamente',
                usuario,
                senha,
                publicacoes: '0',
                seguidores: '0',
                seguindo: '0',
                data
            }
        }, { usuario, senha, data, ref })

        if(perfil.status == 'Ativo'){
            logs.push(usuario + ' - Perfil ativo!')
        }else if(perfil.status == 'Inativo'){
            logs.push(usuario + ' - Perfil inativo!')
        }else if(perfil.status == 'Tentar novamente'){
            logs.push(usuario + ' - Tentar novamente!')
        }

        // ADICIONANDO OU ATUALIZANDO O PERFIL NO GERENCIADOR
        const existe = await Perfil.findOne({ ref, usuario })

        if(existe){
            await Perfil.findOneAndUpdate({ ref, usuario}, perfil)
        }else{
            await Perfil.create(perfil)
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
            data
        }

        // ADICIONANDO OU ATUALIZANDO O PERFIL NO GERENCIADOR
        const existe = await Perfil.findOne({ ref, usuario })

        if(existe){
            await Perfil.findOneAndUpdate({ ref, usuario}, perfil)
        }else{
            await Perfil.create(perfil)
        }

        return true
    }
}

module.exports = verificarPerfil