const router = require('express').Router()
const connectDB = require('../../middlewares/connectDB')
const logado = require('../../middlewares/logado')
const Store = require('electron-store')
const Criador = require('../../models/criador')
const store = new Store()

router.post('/acessocriador', logado, connectDB, async(req, res)=>{
    
    const { email } = store.get('usuarioLogado')
    const acessoCriador = await Criador.findOne({ ref: email })
    let meuAcesso = acessoCriador

    if(acessoCriador){

        if(acessoCriador.data != 'permanente'){
            const dataPlano = acessoCriador.data
            const diaPlano = dataPlano.split('/')[0]
            const mesPlano = dataPlano.split('/')[1]
            const anoPlano = dataPlano.split('/')[2]
            const numeroDataPlano = Number(anoPlano + mesPlano + diaPlano)

            const dataAtual = new Date()
            const diaAtual = dataAtual.getDate().toString().padStart(2, '0')
            const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, '0')
            const anoAtual = dataAtual.getFullYear()
            const numeroDataAtual = Number(anoAtual + mesAtual + diaAtual)

            if(numeroDataPlano < numeroDataAtual){
                await Criador.findOneAndDelete({
                    ref: email
                })

                meuAcesso = await Criador.findOne({ ref: email })
            }
        }

        return res.json({
            ok: true,
            status: meuAcesso.status,
            data: meuAcesso.data
        })
    }else{
        return res.json({
            ok: false,
            status: false,
            data: 'Sem acesso'
        })
    }
})

module.exports = router