const router = require('express').Router()
const logado = require('../../middlewares/logado')
const montador = require('../../auto/montador/index')

router.post('/montador', logado, async(req, res)=>{

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

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const alterarFotoPerfilConfigurado = alterarFotoPerfil === 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

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