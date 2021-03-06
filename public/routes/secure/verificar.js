const router = require('express').Router()
const verificar = require('../../auto/verificar/index')
const Store = require('electron-store')
const store = new Store()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')

router.post('/verificar', logado, connectDB, async(req, res)=>{

    const { caminhoNavegador, visivel, login, anonimo, userAgent, tempo, perfis } = req.body
    const { email } = store.get('usuarioLogado')

    let visivelConfigurado = visivel === 'sim' ? true : false 
    let loginConfigurado = login === 'sim' ? true : false 
    let anonimoConfigurado = anonimo === 'sim' ? true : false 
    let tempoConfigurado = Number(tempo) * 1000

    global.verificar = []

    await verificar(visivelConfigurado, loginConfigurado, anonimoConfigurado, tempoConfigurado, userAgent, perfis, email, caminhoNavegador, global.verificar)
   
    return res.json({
        ok: true
    })
})

module.exports = router