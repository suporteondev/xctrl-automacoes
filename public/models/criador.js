const { Schema, model } = require('mongoose')

const Criador = new Schema({
    ref: String,
    status: Boolean,
    data: String
})

module.exports = model('Criador', Criador)