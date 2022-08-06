const router = require('express').Router()
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const store = new Store()
const criador = require('../../auto/criador/index')

router.post('/criador', logado, async(req, res)=>{

    global.criador = []

    const { 
        verAcontecendo,
        navegadorAnonimo,
        userAgent,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        esperarEntre,
        montarPerfis
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo == 'sim' ? false : true
    const navegadorAnonimoConfigurado = navegadorAnonimo == 'sim' ? true : false
    const limparLoginConfigurado = limparLogin == 'sim' ? true : false
    const montarPerfisConfigurado = montarPerfis == 'sim' ? true : false

    const { 
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis
    } = store.get('configuracoesMontador')

    const alterarFotoPerfilConfigurado = alterarFotoPerfil == 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia == 'sim' ? true : false

    await criador(
        verAcontecendoConfigurado,
        navegadorAnonimoConfigurado,
        userAgent,
        generoPerfis, 
        senhaPerfis, 
        limparLoginConfigurado,
        comoSalvar,
        quantidadePerfis, 
        emailTemporario, 
        esperarEntre,
        montarPerfisConfigurado,
        alterarFotoPerfilConfigurado,
        alterarBiografiaConfigurado,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        global.criador
    )

    return res.json({
        ok: true
    })
})

module.exports = router