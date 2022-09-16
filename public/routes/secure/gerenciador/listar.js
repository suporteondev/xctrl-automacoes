const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../../middlewares/connectDB')
const logado = require('../../../middlewares/logado')
const Perfil = require('../../../models/perfil')
const store = new Store()

router.post('/', logado, connectDB, async(req, res)=>{

    try{

        const { email : ref } = store.get('usuarioLogado')

        // BUSCANDO OS PERFIS NO BD
        const perfis = await Perfil.find({ ref })

        // RETORNANDO O RESULTADO
        return res.json({
            ok: true,
            perfis: perfis
        })

    }catch(erro){
        
        // RETORNANDO O RESULTADO
        return res.json({
            ok: false,
            perfis: []
        })
    }
})

module.exports = router