const router = require('express').Router()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const montador = require('../../auto/montador/index')

router.post('/montador', logado, connectDB, async(req, res)=>{

    global.montador = []

    const { 
        caminhoNavegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        seusPerfis,
        caminhoPastaFotos,
        generoPerfis,
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLogin,
        esperarEntre
    } = req.body

    console.log('caminhoNavegador ' + caminhoNavegador)

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const alterarFotoPerfilConfigurado = alterarFotoPerfil === 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    console.log('modoAnonimo ' + modoAnonimo)
    console.log('userAgent ' + userAgent)
    console.log('seusPerfis ' + seusPerfis)
    console.log('caminhoPastaFotos ' + caminhoPastaFotos)
    console.log('generoPerfis ' + generoPerfis)
    console.log('alterarFotoPerfil ' + alterarFotoPerfil)
    console.log('alterarBiografia ' + alterarBiografia)
    console.log('quantidadePublicacoesFeed ' + quantidadePublicacoesFeed)
    console.log('quantidadePublicacoesStory ' + quantidadePublicacoesStory)
    console.log('seguirPerfis ' + seguirPerfis)
    console.log('limparLogin ' + limparLogin)
    console.log('esperarEntre ' + esperarEntre)

    await montador(
        caminhoNavegador, 
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        caminhoPastaFotos,
        generoPerfis,
        alterarFotoPerfilConfigurado,
        alterarBiografiaConfigurado,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLoginConfigurado,
        esperarEntre,
        global.montador
    )

    return res.json({
        ok: true
    })
})

module.exports = router