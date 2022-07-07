const Store = require('electron-store')
const store = new Store()

module.exports = async function logado(req, res, next){
    const email = store.get('logado')

    if(email == false){
        return res.json({
            ok: false,
            mensagem: 'Você não possui permissão para acessar essa rota!'
        })
    }else{
        next()
    }
}