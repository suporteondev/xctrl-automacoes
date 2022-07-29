const express = require('express')
const cors = require('cors')
const server = express()

global.verificador = []
global.criador = []
global.montador = []

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/api/', require(`./routes/acessar`))
server.use('/api/', require(`./routes/secure/verificador`))
server.use('/api/', require(`./routes/secure/criador`))
server.use('/api/', require(`./routes/secure/montador`))
server.use('/api/', require(`./routes/secure/pagamentos`))
server.use('/api/', require(`./routes/secure/acessogerenciador`))
server.use('/api/', require(`./routes/secure/acessocriador`))
server.use('/api/', require(`./routes/secure/acessomontador`))
server.use('/api/', require(`./routes/secure/abrirnavegador`))

module.exports = server