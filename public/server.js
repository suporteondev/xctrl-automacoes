const express = require('express')
const cors = require('cors')
const server = express()

global.criador = []
global.montador = []
global.verificador = []
global.adicionador = []
global.seguidores = []

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '25mb'}))
server.use(express.json({limit: '25mb'}))

server.use('/api/', require(`./routes/acessar`))
server.use('/api/', require(`./routes/secure/verificador`))
server.use('/api/', require(`./routes/secure/abrirabascriador`))
server.use('/api/', require(`./routes/secure/iniciarcriador`))
server.use('/api/', require(`./routes/secure/montador`))
server.use('/api/', require(`./routes/secure/pagamentos`))
server.use('/api/', require(`./routes/secure/adicionador`))
server.use('/api/', require(`./routes/secure/acessogerenciador`))
server.use('/api/', require(`./routes/secure/acessocriador`))
server.use('/api/', require(`./routes/secure/acessomontador`))
server.use('/api/', require(`./routes/secure/seguidores`))
server.use('/api/', require(`./routes/secure/abrirnavegador`))


module.exports = server