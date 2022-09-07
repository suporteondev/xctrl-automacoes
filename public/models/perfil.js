const { Schema, model } = require('mongoose')

const PerfilSchema = new Schema({
    ref: String,
    status: String,
    usuario: String,
    senha: String,
    seguidores: String,
    seguindo: String,
    publicacoes: String,
    data: String
})

module.exports = model('Perfil', PerfilSchema)