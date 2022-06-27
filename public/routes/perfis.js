const router = require('express').Router()
const connectDB = require('../configs/connectDB')
const Store = require('electron-store')
const Perfil = require('../models/perfil')
const store = new Store();

router.post('/perfis', async(req, res)=>{

    const email = store.get('logado')

    try{
        await connectDB() 
    }catch(erro){
        console.log(erro.message)
        return res.json({ 
            ok: false, 
            mensagem: 'Não conseguimos conectar ao banco. Verifique sua rede e tente novamente.',
        })
    }

    const perfis = await Perfil.find({ ref: email })

    return res.json({
        ok: true,
        mensagem: 'Perfis capturados com sucesso!',
        perfis
    })

})

module.exports = router