const router = require('express').Router()
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const abrirJanela = require('../../abrirJanela')

router.post('/abrirabasverificador', logado, async(req, res)=>{
    await abrirJanela(320, 300, 'logsverificador')
    return res.json({ ok: true })
})

module.exports = router