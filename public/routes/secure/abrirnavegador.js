const router = require('express').Router()
const logado = require('../../middlewares/logado')
const open = require('open')

router.post('/abrirnavegador', logado, async(req, res)=>{
    const { url } = req.body

    await open(url)

    return res.json({
        ok: true
    })
})

module.exports = router