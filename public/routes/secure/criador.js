const router = require('express').Router()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const criador = require('../../auto/criador/index')

router.post('/criador', logado, connectDB, async(req, res)=>{

    global.criador = []

    const { 
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        listaUserAgents,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        ondeSalvar,
        esperarEntre
    } = req.body

    const modoInvisivelConfigurado = modoInvisivel === 'sim' ? true : false 
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false 
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false 
    const esperarEntreConfigurado = Number(esperarEntre) * 1000

    await criador(
        caminhoNavegador, 
        modoInvisivelConfigurado,
        modoAnonimoConfigurado,
        generoPerfis, 
        senhaPerfis, 
        limparLoginConfigurado,
        comoSalvar,
        ondeSalvar,
        quantidadePerfis, 
        emailTemporario, 
        esperarEntreConfigurado,
        global.criador
    )

    return res.json({
        ok: true
    })
})

module.exports = router