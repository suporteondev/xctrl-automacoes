const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const montador = require('../../../auto/automacoes/montador')

router.post('/', logado, async(req, res)=>{

    global.montador = []

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
        userToken,
        metaSigaSocial,
        quantidadeAcoesSigaSocial,
        tempoEntreAcoesSigaSocial,
        esperarEntre
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const alterarFotoPerfilConfigurado = alterarFotoPerfil === 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false
    const metaSigaSocialConfigurado = metaSigaSocial === 'diaria' ? 0 : 1
    const quantidadeAcoesSigaSocialConfigurado = Number(quantidadeAcoesSigaSocial)
    const tempoEntreAcoesSigaSocialConfigurado = Number(tempoEntreAcoesSigaSocial)

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
        userToken,
        metaSigaSocialConfigurado,
        quantidadeAcoesSigaSocialConfigurado,
        tempoEntreAcoesSigaSocialConfigurado,
        global.montador
    )

    return res.json({
        ok: true
    })
})

module.exports = router