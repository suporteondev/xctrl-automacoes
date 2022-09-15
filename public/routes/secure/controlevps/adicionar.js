const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../../middlewares/connectDB')
const logado = require('../../../middlewares/logado')
const Vps = require('../../../models/vps')
const store = new Store()

router.post('/controlevps/adicionar', logado, connectDB, async(req, res)=>{

    // Capturando os dados da requisição
    const { nome } = req.body
    const { email } = store.get('usuarioLogado')

    let meusPerfis = []

    // Capturando a data atual
    let dataAtual = new Date()
    let dia = dataAtual.getDate().toString().padStart(2, '0')
    let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0')
    let ano = dataAtual.getFullYear()
    let data = `${dia}/${mes}/${ano}`

    // Buscando a lista de perfis no banco de dados
    await Vps.create({ 
        ref: email, 
        nome, 
        data 
    })

    meusPerfis = await Vps.find({ ref: email })

    // Retorando os perfis
    res.json({
        ok: true,
        mensagem: 'Perfis apagados com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router