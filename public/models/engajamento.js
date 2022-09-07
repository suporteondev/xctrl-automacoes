const { Schema, model } = require('mongoose')

const EngajamentoSchema = new Schema({
    ref: String,
    status: String,
    usuario: String,
    senha: String,
    seguidores: String,
    seguindo: String,
    publicacoes: String,
    data: String,
    cookie: Array,
    userAgent: String
})

module.exports = model('Engajamento', EngajamentoSchema)