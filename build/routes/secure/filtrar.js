const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const Perfil = require('../../models/perfil')
const store = new Store()

router.post('/filtrar', logado, connectDB, async(req, res)=>{

    // Recuperando dados da requisição
    const { filtro } = req.body
    const email = store.get('logado')
    let perfis = null

    // Buscando a lista de perfis no banco de dados
    if(filtro == 'todos'){
        perfis = await Perfil.find({ ref: email })
    }else if(filtro == 'ativo'){
        perfis = await Perfil.find({ ref: email, status: filtro })
    }else if(filtro == 'novamente'){
        perfis = await Perfil.find({ ref: email, status: filtro })
    }else if(filtro == 'inativo'){
        perfis = await Perfil.find({ ref: email, status: filtro })
    }else if(filtro == '0'){
        perfis = await Perfil.find({ ref: email, status: 'ativo', publicacoes: '0' })
    }else if(filtro == 'prontas-gni'){
        
        let variavelPerfis = await Perfil.find({ ref: email, status: 'ativo' })
        let prontasParaGNI = []

        for (let x = 0; x < variavelPerfis.length; x++) {
            const perfil = variavelPerfis[x]
            if(Number(perfil.seguidores) >= 15 && Number(perfil.publicacoes) >= 4){
                prontasParaGNI.push(perfil)
            }
        }
        
        perfis = prontasParaGNI
        
    }else if(filtro == 'prontas-dizu'){

        let variavelPerfis = await Perfil.find({ ref: email, status: 'ativo' })
        let prontasParaDIZU = []

        for (let x = 0; x < variavelPerfis.length; x++) {
            const perfil = variavelPerfis[x]
            if(Number(perfil.seguidores) >= 15 && Number(perfil.publicacoes) >= 5){
                prontasParaDIZU.push(perfil)
            }
        }
        
        perfis = prontasParaDIZU
    }

    // Retorando os perfis
    res.json({
        ok: true,
        mensagem: 'Todos os perfis foram filtrados com sucesso',
        perfis
    })
})

module.exports = router