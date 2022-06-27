const express = require('express')
const cors = require('cors')
const server = express()

server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())

let rotas = [ 
    'acessar',
    'perfis',
    'filtrarporusuario',
    'verificar',
    'deletarperfis',
    'filtrar',
    'removerperfisgni',
    'transferirperfis'
]

global.verificar = []
global.removerperfisgni = []

rotas.forEach(rota => {
    server.use('/api/', require(`./routes/${rota}`))
})

module.exports = server