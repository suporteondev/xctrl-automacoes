const router = require('express').Router()
const verificador = require('../../auto/verificador/index')
const Store = require('electron-store')
const store = new Store()
const logado = require('../../middlewares/logado')

router.post('/iniciarverificador', logado, async(req, res)=>{

    const { 
        navegador,
        verAcontecendo, 
        modoAnonimo, 
        userAgent,
        seusPerfis, 
        limparLogin,
        esperarEntre,
        aba
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    global.verificador[aba] = []

    await verificador(
        navegador,
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        limparLoginConfigurado,
        esperarEntre,
        global.verificador[aba]
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router