const puppeteer = require('puppeteer-core')
const selecionarUserAgentAleatorio = require('../selecionarUserAgentAleatorio')
const acessarPerfil = require('../instagram/acessarPerfil')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const verificarPerfil = require('../instagram/verificarPerfil')
const Store = require('electron-store')
const abrirNavegador = require('../atalhos/abrirNavegador')
const store = new Store()

const verificador = async(
    navegadorEscolhido,
    verAcontecendo, 
    modoAnonimo, 
    userAgent,
    seusPerfis, 
    limparLogin,
    esperarEntre,
    logs
)=>{

    // MONTANDO OS PERFIS
    for(let x = 0; x < seusPerfis.length; x++){

        // ABRINDO O NAVEGADOR
        const { navegador, pagina } = await abrirNavegador(
            navegadorEscolhido,
            verAcontecendo,
            modoAnonimo,
            userAgent,
            'mobile'
        )

        // CAPTURANDO O USUÁRIO E SENHA DO PERFIL A SER MONTADO
        const { usuario, senha } = seusPerfis[x]
        
        // ACESSANDO O PERFIL
        const resultadoAcessarPerfil = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessarPerfil == false){
            await navegador.close()
            continue
        } 

        // VERIFICANDO OS PERFIS
        for (let x = 0; x < seusPerfis.length; x++) {

            const { usuario: usuarioPerfil, senha: senhaPerfil } = seusPerfis[x]

            // Capturando os perfis já adicionados no gerenciador
            let perfisGerenciador = store.get('perfisGerenciador')
            let novoArrayPerfisGerenciador = perfisGerenciador

            // Capturando a data atual
            let dataAtual = new Date()
            let dia = dataAtual.getDate().toString().padStart(2, '0')
            let mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0')
            let ano = dataAtual.getFullYear()
            let data = `${dia}/${mes}/${ano}`

            await verificarPerfil(pagina, novoArrayPerfisGerenciador, usuarioPerfil, senhaPerfil, data, logs)

            if(esperarEntre != 0){
                logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                await pagina.waitForTimeout(esperarEntre)
            }
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(limparLogin == true){
            await limparAtividadeLogin(pagina, usuario, logs)
        }

        // FECHANDO O NAVEGADOR
        await navegador.close()

        break
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = verificador