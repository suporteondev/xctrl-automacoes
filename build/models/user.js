const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    nome: String,
    email: String,
    senha: String
})

module.exports = model('User', UserSchema)