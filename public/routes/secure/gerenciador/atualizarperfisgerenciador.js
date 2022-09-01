const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const fs = require('fs')
const { rootPath } = require('electron-root-path')

router.post('/atualizarperfisgerenciador', logado, async(req, res)=>{

    // CAPTURANDO O PERFIL DA ROTA
    const { usuario, perfil } = req.body

    // LENDO O ARQUIVO
    const perfis = JSON.parse(fs.readFileSync(rootPath , './armazenamento/perfis-gerenciador.json', 'utf-8'))

    // CAPTURANDO A POSIÇÃO DO PERFIL QUE SERÁ ATUALIZADO
    const indexPerfil = perfis.findIndex(perfil => perfil.usuario === usuario)

    // ATUALIZANDO O PERFIL  
    perfis[indexPerfil] = perfil

    // SALVANDO O ARQUIVO
    fs.writeFileSync(rootPath , './armazenamento/perfis-gerenciador.json', JSON.stringify(perfis), 'utf-8')  

    // LENDO O ARQUIVO NOVAMENTE
    const perfisAtualizado = JSON.parse(fs.readFileSync(rootPath , './armazenamento/perfis-gerenciador.json', 'utf-8'))

    // RETORNANDO O CONTEÚDO DO ARQUIVO
    return res.json({
        ok: true,
        perfis: perfisAtualizado
    })
   
})

module.exports = router