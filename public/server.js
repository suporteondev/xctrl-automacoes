const express = require('express')
const cors = require('cors')
const server = express()

global.verificar = []
global.removedor = []
global.criador = []
global.montador = []

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use('/api/', require(`./routes/acessar`))
server.use('/api/', require(`./routes/secure/perfis`))
server.use('/api/', require(`./routes/secure/filtrarporusuario`))
server.use('/api/', require(`./routes/secure/verificar`))
server.use('/api/', require(`./routes/secure/deletarperfis`))
server.use('/api/', require(`./routes/secure/filtrar`))
server.use('/api/', require(`./routes/secure/removedor`))
server.use('/api/', require(`./routes/secure/criador`))
server.use('/api/', require(`./routes/secure/montador`))
server.use('/api/', require(`./routes/secure/transferirperfis`))
server.use('/api/', require(`./routes/secure/pagamentos`))
server.use('/api/', require(`./routes/secure/acessogerenciador`))
server.use('/api/', require(`./routes/secure/acessocriador`))
server.use('/api/', require(`./routes/secure/acessomontador`))
server.use('/api/', require(`./routes/secure/abrirnavegador`))

module.exports = server