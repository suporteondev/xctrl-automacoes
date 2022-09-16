const router = require('express').Router()
const Store = require('electron-store')
const connectDB = require('../../../middlewares/connectDB')
const logado = require('../../../middlewares/logado')
const Engajamento = require('../../../models/engajamento')
const Perfil = require('../../../models/perfil')
const store = new Store()

router.post('/', logado, connectDB, async(req, res)=>{

    // Capturando os dados da requisição
    const { perfis } = req.body
    const { email } = store.get('usuarioLogado')

    let meusPerfis = []

    // Buscando a lista de perfis no banco de dados
    async function transferir(){
        for(let x = 0; x < perfis.length; x++){
            try{

                // Pesquisando o usuário na base do gerenciador
                const perfil2 = await Perfil.findOne({ 
                    ref: email, 
                    usuario: perfis[x] 
                })

                // Adicionando na base de engajamento
                await Engajamento.create({
                    ref: perfil2.ref,
                    status: perfil2.status,
                    usuario: perfil2.usuario,
                    senha: perfil2.senha,
                    seguidores: perfil2.seguidores,
                    seguindo: perfil2.seguindo,
                    publicacoes: perfil2.publicacoes,
                    data: perfil2.data
                })

                // Apagando o perfil da base do gerenciador
                await Perfil.findOneAndDelete({ 
                    ref: email, 
                    usuario: perfis[x] 
                })

            }catch(erro){
                
                // Pesquisando o usuário na base do gerenciador
                const perfil3 = await Perfil.findOne({ 
                    ref: email, 
                    usuario: perfis[x] 
                })

                // Adicionando na base de engajamento
                await Engajamento.create({
                    ref: perfil3.ref,
                    status: perfil3.status,
                    usuario: perfil3.usuario,
                    senha: perfil3.senha,
                    seguidores: perfil3.seguidores,
                    seguindo: perfil3.seguindo,
                    publicacoes: perfil3.publicacoes,
                    data: perfil3.data
                })

                // Apagando o perfil da base do gerenciador
                await Perfil.findOneAndDelete({ 
                    ref: email, 
                    usuario: perfis[x] 
                })
            }
        }
    
        meusPerfis = await Perfil.find({ ref: email })
    }

    await transferir()

    // Retorando os perfis
    res.json({
        ok: true,
        mensagem: 'Perfis transferidos com sucesso!',
        perfis: meusPerfis
    })
})

module.exports = router