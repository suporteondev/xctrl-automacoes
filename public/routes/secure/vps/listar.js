const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../../middlewares/connectDB')
const logado = require('../../../middlewares/logado')
const Vps = require('../../../models/vps')
const store = new Store()

router.post('/', logado, connectDB, async(req, res)=>{

    // Capturando os dados da requisição
    const { email } = store.get('usuarioLogado')

    // Buscando a lista de perfis no banco de dados
    let meusPerfis = await Vps.find({ ref: email })

    // Retorando os perfis
    res.json({
        ok: true,
        mensagem: 'Perfis apagados com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router