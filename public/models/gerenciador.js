const { Schema, model } = require('mongoose')

const Gerenciador = new Schema({
    ref: String,
    status: Boolean,
    data: String
})

module.exports = model('Gerenciador', Gerenciador)