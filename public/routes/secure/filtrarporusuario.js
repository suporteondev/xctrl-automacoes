const router = require('express').Router()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const Perfil = require('../../models/perfil')
const store = new Store()

router.post('/filtrarporusuario', logado, connectDB, async(req, res)=>{

    const { filtro } = req.body
    const { email } = store.get('usuarioLogado')

    const perfis = await Perfil.find({ 
        ref: email, 
        usuario: filtro 
    })

    return res.json({
        ok: true,
        mensagem: 'Perfis capturados com sucesso!',
        perfis
    })

})

module.exports = router