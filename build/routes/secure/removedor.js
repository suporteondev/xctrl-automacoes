const router = require('express').Router()
const Store = require('electron-store')
const removedor = require('../../auto/removedor')
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const store = new Store()

router.post('/removedor', logado, connectDB, async(req, res)=>{

    global.removedor = []

    const { 
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        emailPlataforma,
        senhaPlataforma,
        tipoAcao
    } = req.body

    const modoInvisivelConfigurado = modoInvisivel == 'sim' ? true : false
    const modoAnonimoConfigurado = modoAnonimo == 'sim' ? true : false

    await removedor(
        caminhoNavegador,
        modoInvisivelConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        emailPlataforma,
        senhaPlataforma,
        tipoAcao
    )

    return res.json({
        ok: true
    })
})

module.exports = router