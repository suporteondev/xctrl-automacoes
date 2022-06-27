const router = require('express').Router()
const Store = require('electron-store')
const Perfil = require('../models/perfil')
const User = require('../models/user')
const store = new Store()

// Declarando rota do tipo GET
router.post('/transferirperfis', async(req, res)=>{

    // Pegando os dados da rota
    const { ref, perfis } = req.body
    const email = store.get('logado')

    // Verificando se o email está cadastrado na plataforma
    const existe = await User.findOne({ email: ref })

    // Se o email não existir
    if(!existe){
        return res.json({
            ok: false,
            mensagem: 'O email digitado não está cadastrado na plataforma!',
        })
    }

    // Atualizando os perfis
    for(let x = 0; x < perfis.length; x++) {

        // Capturando o perfil
        const perfil = perfis[x]

        // Atualizando 
        await Perfil.updateOne({ ref: email, usuario: perfil }, {
            ref: ref
        })
    }

    // Perfis
    const meusPerfis = await Perfil.find({ ref: email })

    // Retornando o resultado
    return res.json({
        ok: true,
        mensagem: 'A transferência dos perfis foi realizada com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router