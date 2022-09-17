const router = require('express').Router()
const seguidores = require('../../../auto/automacoes/seguidores')
const logado = require('../../../middlewares/logado')

router.post('/', logado, async(req, res)=>{

    global.seguidores = []

    const { 
        navegador,
        verAcontecendo, 
        modoAnonimo,
        perfis,
        usuarios,
        esperarEntre
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false

    await seguidores(
        navegador,
        verAcontecendoConfigurado, 
        modoAnonimoConfigurado,
        perfis,
        usuarios,
        esperarEntre,
        global.seguidores
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router