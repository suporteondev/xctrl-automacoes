const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const fs = require('fs')
const { rootPath } = require('electron-root-path')

router.post('/lerperfisgerenciador', logado, async(req, res)=>{

    // LENDO O ARQUIVO
    const perfis = JSON.parse(fs.readFileSync(rootPath + '\\armazenamento\\perfis-gerenciador.json', 'utf-8'))
    
    // RETORNANDO O CONTEÚDO DO ARQUIVO
    return res.json({
        ok: true,
        perfis
    })
   
})

module.exports = router