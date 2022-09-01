const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const montador = require('../../../auto/montador/index')

router.post('/iniciarmontador', logado, async(req, res)=>{

    const { 
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        seusPerfis,
        generoPerfis,
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLogin,
        esperarEntre,
        aba
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const alterarFotoPerfilConfigurado = alterarFotoPerfil === 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    global.montador[aba] = []

    await montador(
        navegador,
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        generoPerfis,
        alterarFotoPerfilConfigurado,
        alterarBiografiaConfigurado,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLoginConfigurado,
        esperarEntre,
        global.montador[aba]
    )

    return res.json({
        ok: true
    })
})

module.exports = router