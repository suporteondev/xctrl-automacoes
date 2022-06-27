const router = require('express').Router()
const removerPerfisGni = require('../auto/removedorgni/index')
const Store = require('electron-store')
const store = new Store()
const connectDB = require('../configs/connectDB')

router.post('/removerperfisgni', async(req, res)=>{

    global.removerperfisgni = []
    const { visivel, anonimo, userAgent, acao, email, senha } = req.body

    let visivelConfigurado = visivel === 'sim' ? true : false 
    let anonimoConfigurado = anonimo === 'sim' ? true : false 

    const caminho = store.get('caminhoNavegador')
    await removerPerfisGni(caminho, visivelConfigurado, anonimoConfigurado, userAgent, acao, email, senha)
    
    global.removerperfisgni.push('O robô terminou, pode voltar!')

    return res.json({
        ok: true
    })
})

module.exports = router