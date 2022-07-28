const router = require('express').Router()
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const store = new Store()
const criador = require('../../auto/criador/index')

router.post('/criador', logado, async(req, res)=>{

    global.criador = []

    const { 
        caminhoNavegador,
        verAcontecendo,
        navegadorAnonimo,
        userAgent,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        ondeSalvar,
        esperarEntre,
        montarPerfis
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo == 'sim' ? false : true
    const navegadorAnonimoConfigurado = navegadorAnonimo == 'sim' ? true : false
    const limparLoginConfigurado = limparLogin == 'sim' ? true : false
    const montarPerfisConfigurado = montarPerfis == 'sim' ? true : false

    const { 
        caminhoPastaFotos,
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis
    } = store.get('configuracoesMontador')

    const alterarFotoPerfilConfigurado = alterarFotoPerfil == 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia == 'sim' ? true : false

    if(montarPerfisConfigurado == true){
        if(caminhoPastaFotos == ''){
            return res.json({
                ok: false,
                mensagem: 'Configure o caminho da pasta de fotos no montador antes de iniciar!'
            })
        }
    }

    await criador(
        caminhoNavegador, 
        verAcontecendoConfigurado,
        navegadorAnonimoConfigurado,
        userAgent,
        generoPerfis, 
        senhaPerfis, 
        limparLoginConfigurado,
        comoSalvar,
        ondeSalvar,
        quantidadePerfis, 
        emailTemporario, 
        esperarEntre,
        montarPerfisConfigurado,
        caminhoPastaFotos,
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