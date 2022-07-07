const mongoose = require('mongoose')

module.exports = async function connectDB(req, res, next){
    try{
        mongoose.connect('mongodb+srv://xctrlusuario:5NatRy8cvzBUSdNH@xctrl.tm1lh.mongodb.net/xctrl?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        next()
    }catch(erro){
        console.log('Erro ao conectar ao banco de dados.')
        return res.json({
            ok: false,
            mensagem: 'Verifique sua internet e tente novamente!'
        })
    }
}