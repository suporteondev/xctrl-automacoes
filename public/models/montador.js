const { Schema, model } = require('mongoose')

const Montador = new Schema({
    ref: String,
    status: Boolean,
    data: String
})

module.exports = model('Montador', Montador)