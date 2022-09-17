const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const realizador = require('../../../auto/automacoes/realizador')

router.post('/', logado, async(req, res)=>{

    global.realizador = []

    const { 
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        seusPerfis,
        vincularPerfisNaoCadastrados,
        assistirStoryEntreXAcoes,
        assistirStoryPorXSegundos,
        quantidadeAcoes,
        esperarEntreAcoes,
        limparLogin,
        qualPlataforma,
        emailPlataforma,
        senhaPlataforma
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const vincularPerfisNaoCadastradosConfigurado = vincularPerfisNaoCadastrados === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    await realizador(
        navegador,
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        vincularPerfisNaoCadastradosConfigurado,
        assistirStoryEntreXAcoes,
        assistirStoryPorXSegundos,
        quantidadeAcoes,
        esperarEntreAcoes,
        limparLoginConfigurado,
        qualPlataforma,
        emailPlataforma,
        senhaPlataforma,
        global.realizador
    )

    // FECHANDO O NAVEGADOR
    global.realizador.push('O robô terminou, pode voltar!')

    return res.json({
        ok: true
    })
})

module.exports = router