const router = require('express').Router()
const verificar = require('../auto/verificar/index')
const Store = require('electron-store')
const store = new Store()
const connectDB = require('../configs/connectDB')

router.post('/verificar', async(req, res)=>{

    const { visivel, login, anonimo, userAgent, tempo, perfis } = req.body
    const email = store.get('logado')

    let visivelConfigurado = visivel === 'sim' ? true : false 
    let loginConfigurado = login === 'sim' ? true : false 
    let anonimoConfigurado = anonimo === 'sim' ? true : false 
    let tempoConfigurado = Number(tempo) * 1000

    try{
        await connectDB() 
    }catch(erro){
        console.log(erro.message)
        return res.json({ 
            ok: false, 
            mensagem: 'Não conseguimos conectar ao banco. Verifique sua rede e tente novamente.',
        })
    }

    const caminho = store.get('caminhoNavegador')
    global.verificar = []

    await verificar(visivelConfigurado, loginConfigurado, anonimoConfigurado, tempoConfigurado, userAgent, perfis, email, caminho, global.verificar)
   
    return res.json({
        ok: true
    })
})

module.exports = router