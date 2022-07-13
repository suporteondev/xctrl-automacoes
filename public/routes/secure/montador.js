const router = require('express').Router()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const montador = require('../../auto/montador/index')

router.post('/montador', logado, connectDB, async(req, res)=>{

    global.montador = []

    const { 
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        generoPerfis,
        modoPerfis,
        listaPerfis,
        pastaFotos,
        fotoPerfil,
        alterarBiografia,
        quantidadePublicacoes,
        limparLogin,
        esperarEntre
    } = req.body

    const modoInvisivelConfigurado = modoInvisivel === 'sim' ? true : false 
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false 
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false 
    const alterarBiografiaConfigurado = alterarBiografia === 'sim' ? true : false 
    const esperarEntreConfigurado = Number(esperarEntre) * 1000

    await montador(
        caminhoNavegador, 
        modoInvisivelConfigurado,
        modoAnonimoConfigurado,
        generoPerfis,
        modoPerfis,
        listaPerfis,
        pastaFotos,
        fotoPerfil,
        alterarBiografiaConfigurado,
        quantidadePublicacoes,
        limparLoginConfigurado,
        esperarEntreConfigurado,
        global.montador
    )

    return res.json({
        ok: true
    })
})

module.exports = router