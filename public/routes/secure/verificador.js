const router = require('express').Router()
const verificador = require('../../auto/verificador/index')
const Store = require('electron-store')
const store = new Store()
const logado = require('../../middlewares/logado')

router.post('/verificador', logado, async(req, res)=>{

    global.verificador = []

    const { 
        verAcontecendo, 
        modoAnonimo, 
        userAgent,
        seusPerfis, 
        limparLogin,
        esperarEntre
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    await verificador(
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        limparLoginConfigurado,
        esperarEntre,
        global.verificador
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router