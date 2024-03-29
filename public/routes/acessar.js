const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const connectDB = require('../middlewares/connectDB')
const Store = require('electron-store')
const Versao = require('../models/versao')
const store = new Store();

router.post('/', connectDB, async(req, res)=>{

    const { email, senha } = req.body

    // Verificando se o email está vazio
    if(email === '') {
        return res.json({ 
            ok: false, 
            mensagem: 'Digite o campo email.' 
        })
    }
    
    // Verificando se a senha está vazia
    if(senha === ''){
        return res.json({ 
            ok: false, 
            mensagem: 'Digite o campo senha.' 
        })
    }

    let usuario = null

    try{
        // Procurando o email digitado no banco de dados
        usuario = await User.findOne({ email: email })
    }catch(erro){
        return res.json({ 
            ok: false, 
            mensagem: 'Verifique sua internet e tente novamente!',
        })
    }

    // Verificando se o usuário não existe
    if(!usuario) return res.json({ ok: false, mensagem: 'Email e/ou senha incorreta!' })

    // Verificando se o usuário existe
    if(usuario){

        // Comparando a senha da requisição com a senha do usuário
        bcrypt.compare(senha, usuario.senha, async(err, resultado)=>{
            
            // Se tiver algum erro, da um console.log nele
            if(err) console.log(err)
            
            // Verificando se as senhas não conferem
            if(resultado == false){
                return res.json({ ok: false, mensagem: 'Email e/ou senha incorreta!' })
            }

            // Verificando se as senhas conferem
            if(resultado == true){

                const versao = await Versao.find()
                const versaoAtual = versao[0].titulo

                store.set('logado', usuario.email)
                store.set('nome', usuario.nome)
                store.set('versaoAtual', versaoAtual)

                return res.json({ 
                    ok: true, 
                    mensagem: 'A plataforma foi acessada com sucesso!',
                    email: usuario.email,
                    nome: usuario.nome
                })
            }
        })
    }
})

module.exports = router