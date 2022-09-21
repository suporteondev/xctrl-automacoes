const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const connectDB = require('../middlewares/connectDB')

router.post('/', connectDB, async(req, res)=>{

    try{

        // Capturando nome, email e senha do frontend
        const { nome, email, senha, confirmar } = req.body

        // As senhas não conferem
        if(senha != confirmar) return res.json({
            ok: false,
            mensagem: 'As senhas não conferem.'
        })

        // Algum campo está vazio
        if(nome == '' || email == '' || senha == '' || confirmar == ''){
            return res.json({
                ok: false,
                mensagem: 'Preencha todos os campos para efetuar o cadastro.'
            })
        }

        // Verificando se o email já existe cadastrado existe
        const existe = await User.findOne({ email: email })

        // Criando uma senha criptografada
        const hashSenha = await bcrypt.hash(senha, 10)
        
        if(!existe){
            await User.create({
                nome: nome,
                email: email,
                senha: hashSenha
            })

            return res.json({
                ok: true,
                mensagem: 'Seu perfil foi cadastrado com sucesso.'
            })
        }else {
            return res.json({
                ok: false,
                mensagem: 'Esse email já possui cadastro em nosso sistema.'
            })
        }        

    }catch(erro){
        return res.json({
            ok: false,
            mensagem: 'Erro ao cadastrar o seu perfil. Verifique sua rede e tente novamente.'
        })
    }
})

module.exports = router