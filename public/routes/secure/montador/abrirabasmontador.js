const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const Store = require('electron-store')
const abrirJanela = require('../../../abrirJanela')

router.post('/abrirabasmontador', logado, async(req, res)=>{
    await abrirJanela(400, 300, 'logsmontador')
    return res.json({ ok: true })
})

module.exports = router