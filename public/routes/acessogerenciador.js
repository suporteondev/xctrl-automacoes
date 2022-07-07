const router = require('express').Router()
const connectDB = require('../configs/connectDB')
const Store = require('electron-store')
const Gerenciador = require('../models/gerenciador')
const store = new Store()

router.post('/acessogerenciador', async(req, res)=>{

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

    const acessoGerenciador = await Gerenciador.findOne({ ref: email })
    console.log(acessoGerenciador)
    if(acessoGerenciador){
        return res.json({
            ok: true,
            acessoGerenciador
        })
    }else{
        return res.json({
            ok: false
        })
    }
})

module.exports = router