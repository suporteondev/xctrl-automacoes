const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../../middlewares/connectDB')
const logado = require('../../../middlewares/logado')
const Engajamento = require('../../../models/engajamento')
const store = new Store()

router.post('/engajamentos/apagarperfis', logado, connectDB, async(req, res)=>{

    // Capturando os dados da requisição
    const { perfis } = req.body
    const { email } = store.get('usuarioLogado')

    let meusPerfis = []

    // Buscando a lista de perfis no banco de dados
    async function deletar(){
        for(let x = 0; x < perfis.length; x++){
            try{
                await Engajamento.findOneAndDelete({ ref: email, usuario: perfis[x] })
            }catch(erro){
                await Engajamento.findOneAndDelete({ ref: email, usuario: perfis[x] })
            }
        }
    
        meusPerfis = await Engajamento.find({ ref: email })
    }

    await deletar()

    // Retorando os perfis
    res.json({
        ok: true,
        mensagem: 'Perfis apagados com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router