const router = require('express').Router()
const seguidores = require('../../../auto/seguidores/index')
const logado = require('../../../middlewares/logado')

router.post('/seguidores', logado, async(req, res)=>{

    global.seguidores = []

    const { 
        navegador,
        verAcontecendo, 
        modoAnonimo,
        usuarios,
        esperarEntre,
        perfisEngajamentos
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo === 'sim' ? false : true
    const modoAnonimoConfigurado = modoAnonimo === 'sim' ? true : false

    await seguidores(
        navegador,
        verAcontecendoConfigurado, 
        modoAnonimoConfigurado,
        usuarios,
        esperarEntre,
        perfisEngajamentos,
        global.seguidores
    )
   
    return res.json({
        ok: true
    })
})

module.exports = router