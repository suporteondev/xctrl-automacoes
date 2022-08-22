const router = require('express').Router()
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const abrirJanela = require('../../abrirJanela')

router.post('/abrirabascriador', logado, async(req, res)=>{
    const { montar } = req.body

    if(montar == 'sim'){
        await abrirJanela(450, 300, 'logscriador')
    }else{
        await abrirJanela(300, 300, 'logscriador')
    }

    return res.json({ ok: true })
})

module.exports = router