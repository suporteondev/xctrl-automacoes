const router = require('express').Router()
const trocarsenha = require('../../../auto/automacoes/trocarsenha')
const Store = require('electron-store')
const store = new Store()
const logado = require('../../../middlewares/logado')

router.post('/', logado, async(req, res)=>{

    global.trocarsenha = []

    const { 
        navegador,
        verAcontecendo, 
        modoAnonimo, 
        userAgent,
        seusPerfis, 
        novaSenha,
        limparLogin,
        esperarEntre
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false
    const limparLoginConfigurado = limparLogin === 'sim' ? true : false

    await trocarsenha(
        navegador,
        verAcontecendoConfigurado,
        modoAnonimoConfigurado,
        userAgent,
        seusPerfis,
        novaSenha,
        limparLoginConfigurado,
        esperarEntre,
        global.trocarsenha
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router