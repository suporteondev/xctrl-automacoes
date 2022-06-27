const mongoose = require('mongoose')

async function connectDB(){
    mongoose.connect('mongodb+srv://xctrlusuario:5NatRy8cvzBUSdNH@xctrl.tm1lh.mongodb.net/xctrl?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = connectDB