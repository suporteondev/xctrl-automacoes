const puppeteer = require('puppeteer-core')
const acessarPerfil = require('../instagram/acessarPerfil')
const trocarSenhaPerfil = require('../instagram/trocarSenhaPerfil')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const Store = require('electron-store')
const abrirNavegador = require('../atalhos/abrirNavegador')
const store = new Store()

const trocarsenha = async(
    navegadorEscolhido,
    verAcontecendo, 
    modoAnonimo, 
    userAgent,
    seusPerfis, 
    novaSenha,
    limparLogin,
    esperarEntre,
    logs
)=>{

    // TROCANDO SENHA DOS PERFIS
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

        // ALTERANDO A SENHA DO PERFIL
        await trocarSenhaPerfil(pagina, usuario, senha, novaSenha, logs)

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

module.exports = trocarsenha