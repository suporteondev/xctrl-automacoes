const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const connectDB = require('../../../middlewares/connectDB')
const bcrypt = require('bcrypt')
const User = require('../../../models/user')
const Store = require('electron-store')
const store = new Store()

router.post('/', connectDB, logado, async(req, res)=>{

    const { email } = store.get('usuarioLogado')
    const { nome, senha, confirmar } = req.body

    const hashSenha = await bcrypt.hash(senha, 10)

    if(nome != ''){
        await User.updateOne({ email }, {
            nome: nome
        })
    }

    if(senha == confirmar && senha != '' && confirmar != ''){
        // Alterar senha
        await User.updateOne({ email }, {
            senha: hashSenha
        })
    }

    if(nome == '' && senha == '' && confirmar == ''){
        return res.json({
            ok: false,
            mensagem: 'Preencha ao menos um campo para as realizar alterações.',
        })
    }

    if(senha != confirmar){
        return res.json({
            ok: false,
            mensagem: 'As senhas digitadas não conferem.'
        })
    }

    return res.json({
        ok: true,
        mensagem: 'Dados alterados com sucesso!',
        nome: nome
    })
})

module.exports = router