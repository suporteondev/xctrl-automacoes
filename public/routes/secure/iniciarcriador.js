const router = require('express').Router()
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const store = new Store()
const criador = require('../../auto/criador/index')

router.post('/iniciarcriador', logado, async(req, res)=>{

    const { 
        navegador,
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
        limparPastaPrefetch,
        limparPastaTemp,
        montarPerfis
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo == 'sim' ? false : true
    const navegadorAnonimoConfigurado = navegadorAnonimo == 'sim' ? true : false
    const limparLoginConfigurado = limparLogin == 'sim' ? true : false
    const montarPerfisConfigurado = montarPerfis == 'sim' ? true : false
    const limparPastaPrefetchConfigurado = limparPastaPrefetch == 'sim' ? true : false
    const limparPastaTempConfigurado = limparPastaTemp == 'sim' ? true : false

    const { 
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis
    } = store.get('configuracoesMontador')

    const alterarFotoPerfilConfigurado = alterarFotoPerfil == 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia == 'sim' ? true : false

    global.criador = []

    await criador(
        navegador,
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
        limparPastaPrefetchConfigurado,
        limparPastaTempConfigurado,
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