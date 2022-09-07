const express = require('express')
const cors = require('cors')
const server = express()

global.criador = []
global.montador = []
global.verificador = []
global.adicionador = []
global.seguidores = []
global.realizador = []

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '100mb'}))
server.use(express.json({limit: '100mb'}))

server.use('/api/', require(`./routes/acessar`))
server.use('/api/', require(`./routes/secure/verificador`))
server.use('/api/', require(`./routes/secure/gerenciador/listarperfis`))
server.use('/api/', require(`./routes/secure/gerenciador/apagarperfis`))
server.use('/api/', require(`./routes/secure/engajamentos/listarperfis`))
server.use('/api/', require(`./routes/secure/engajamentos/apagarperfis`))
server.use('/api/', require(`./routes/secure/abrirabasmontador`))
server.use('/api/', require(`./routes/secure/iniciarcriador`))
server.use('/api/', require(`./routes/secure/iniciarmontador`))
server.use('/api/', require(`./routes/secure/abrirabasverificador`))
server.use('/api/', require(`./routes/secure/iniciarverificador`))
server.use('/api/', require(`./routes/secure/montador`))
server.use('/api/', require(`./routes/secure/realizador`))
server.use('/api/', require(`./routes/secure/pagamentos`))
server.use('/api/', require(`./routes/secure/adicionador`))
server.use('/api/', require(`./routes/secure/acessogerenciador`))
server.use('/api/', require(`./routes/secure/acessocriador`))
server.use('/api/', require(`./routes/secure/acessomontador`))
server.use('/api/', require(`./routes/secure/seguidores`))
server.use('/api/', require(`./routes/secure/abrirnavegador`))

module.exports = server