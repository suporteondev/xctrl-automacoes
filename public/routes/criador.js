const router = require('express').Router()
const Store = require('electron-store')
const criador = require('../auto/criador')
const store = new Store()

router.post('/criador', async(req, res)=>{

    global.criador = []

    const { 
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        provedorEmail,
        quantidadePerfis,
        generoPerfis,
        senhaPerfis,
        comoSalvar,
        ondeSalvar,
        esperarSegundos
    } = req.body

    const modoInvisivelConfigurado = modoInvisivel == 'sim' ? true : false
    const modoAnonimoConfigurado = modoAnonimo == 'sim' ? true : false

    await criador(
        caminhoNavegador,
        modoInvisivelConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        provedorEmail,
        quantidadePerfis,
        generoPerfis,
        senhaPerfis,
        comoSalvar,
        ondeSalvar,
        esperarSegundos
    )

    return res.json({
        ok: true
    })
})

module.exports = router