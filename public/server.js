// IMPORTANDO OS MÓDULOS
const express = require('express')
const cors = require('cors')
const server = express()

// CONFIGURAÇÕES DO SERVIDOR
server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '100mb'}))
server.use(express.json({limit: '100mb'}))

// ROTAS DO CRIADOR
server.use('/api/criador/acesso', require(`./routes/secure/criador/acesso`))
server.use('/api/criador/iniciar', require(`./routes/secure/criador/iniciar`))

// ROTAS DO MONTADOR
server.use('/api/montador/acesso', require(`./routes/secure/montador/acesso`))
server.use('/api/montador/iniciar', require(`./routes/secure/montador/iniciar`))

// ROTAS DO GERENCIADOR
server.use('/api/gerenciador/acesso', require(`./routes/secure/gerenciador/acesso`))
server.use('/api/gerenciador/verificar', require(`./routes/secure/gerenciador/verificar`))
server.use('/api/gerenciador/listar', require(`./routes/secure/gerenciador/listar`))
server.use('/api/gerenciador/apagar', require(`./routes/secure/gerenciador/apagar`))
server.use('/api/gerenciador/transferir', require(`./routes/secure/gerenciador/transferir`))

// ROTAS DO ENGAJAMENTO
server.use('/api/engajamento/listar', require(`./routes/secure/engajamento/listar`))
server.use('/api/engajamento/apagar', require(`./routes/secure/engajamento/apagar`))
server.use('/api/engajamento/seguidores', require(`./routes/secure/engajamento/seguidores`))

// ROTAS DA VPS
server.use('/api/vps/adicionar', require(`./routes/secure/vps/adicionar`))
server.use('/api/vps/apagar', require(`./routes/secure/vps/apagar`))
server.use('/api/vps/listar', require(`./routes/secure/vps/listar`))

// ROTAS DO REALIZADOR
server.use('/api/realizador/iniciar', require(`./routes/secure/realizador/iniciar`))

// ROTAS GERAIS
server.use('/api/geral/pagamentos', require(`./routes/secure/geral/pagamentos`))
server.use('/api/geral/abrirnavegador', require(`./routes/secure/geral/abrirnavegador`))

// ROTAS NÃO SEGURAS
server.use('/api/acessar', require(`./routes/acessar`))

module.exports = server