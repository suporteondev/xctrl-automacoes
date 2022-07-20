const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const Perfil = require('../../models/perfil')
const User = require('../../models/user')
const store = new Store()

router.post('/transferirperfis', logado, connectDB, async(req, res)=>{

    const { ref, perfis } = req.body
    const { email } = store.get('usuarioLogado')

    const existe = await User.findOne({ email: ref })

    if(!existe){
        return res.json({
            ok: false,
            mensagem: 'O email digitado não está cadastrado na plataforma!',
        })
    }

    for(let x = 0; x < perfis.length; x++) {
        const perfil = perfis[x]
        await Perfil.updateOne({ ref: email, usuario: perfil }, {
            ref: ref
        })
    }

    const meusPerfis = await Perfil.find({ ref: email })

    return res.json({
        ok: true,
        mensagem: 'A transferência dos perfis foi realizada com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router