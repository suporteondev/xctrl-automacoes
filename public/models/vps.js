const { Schema, model } = require('mongoose')

const VpsSchema = new Schema({
    ref: String,
    nome: String,
    data: String
})

module.exports = model('Vps', VpsSchema)