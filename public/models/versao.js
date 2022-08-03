const { Schema, model } = require('mongoose')

const Versao = new Schema({
    titulo: String,
    descricao: String,
    download: String
})

module.exports = model('Versao', Versao)