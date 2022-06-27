module.exports = async function logado(req, res, next){
    if(global.logado){
        next()
    }else{
        res.json({
            ok: false,
            mensagem: 'Você não possui permissão para usar essa rota!'
        })
    }
}