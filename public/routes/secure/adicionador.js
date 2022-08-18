const router = require('express').Router()
const adicionador = require('../../auto/adicionador/index')
const Store = require('electron-store')
const logado = require('../../middlewares/logado')

router.post('/adicionador', logado, async(req, res)=>{

    global.adicionador = []

    const { 
        navegador,
        verAcontecendo, 
        modoAnonimo, 
        userAgent,
        seusPerfis,
        esperarEntre
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false

    await adicionador(
        navegador,
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        esperarEntre,
        global.adicionador
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router