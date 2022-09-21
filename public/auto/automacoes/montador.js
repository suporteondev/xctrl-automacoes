const fs = require('fs')
const path = require('path')
const { rootPath } = require('electron-root-path')
const acessarPerfil = require('../instagram/acessarPerfil')
const alterarGeneroPerfil = require('../instagram/alterarGeneroPerfil')
const postarFotoPerfil = require('../instagram/postarFotoPerfil')
const alterarBiografiaPerfil = require('../instagram/alterarBiografiaPerfil')
const realizarPublicacoesFeed = require('../instagram/realizarPublicacoesFeed')
const realizarPublicacoesStory = require('../instagram/realizarPublicacoesStory')
const limparAtividadeLogin = require('../instagram/limparAtividadeLogin')
const seguirPerfisFamosos = require('../instagram/seguirPerfisFamosos')
const abrirNavegador = require('../atalhos/abrirNavegador')
const selecionarPastaFotos = require('../atalhos/selecionarPastaFotos')
const procurarBloqueios = require('../instagram/procurarBloqueios')
const cadastrarPerfilSigaSocial = require('../sigasocial/cadastrarPerfil')
const pastasEscolhidas = []

const montador = async(
    navegadorEscolhido,
    verAcontecendo,
    modoAnonimo,
    userAgent,
    seusPerfis,
    generoPerfis,
    alterarFotoPerfil,
    alterarBiografia,
    quantidadePublicacoesFeed,
    quantidadePublicacoesStory,
    seguirPerfis,
    limparLogin,
    esperarEntre,
    userToken,
    metaSigaSocial,
    quantidadeAcoesSigaSocial,
    tempoEntreAcoesSigaSocial,
    logs
)=>{

    // MONTANDO OS PERFIS
    for(let x = 0; x < seusPerfis.length; x++){

        // CAPTURANDO O USUÁRIO E SENHA DO PERFIL A SER MONTADO
        const { usuario, senha } = seusPerfis[x]

        // ABRINDO O NAVEGADOR
        const { navegador, pagina } = await abrirNavegador(
            navegadorEscolhido,
            verAcontecendo,
            modoAnonimo,
            userAgent,
            'mobile'
        )
        
        // ACESSANDO O PERFIL
        const resultadoAcessarPerfil = await acessarPerfil(pagina, usuario, senha, logs)
        if(resultadoAcessarPerfil == false){
            await navegador.close()
            continue
        } 

        // ALTERANDO O GÊNERO DO PERFIL
        await alterarGeneroPerfil(pagina, usuario, generoPerfis, logs)

        // CAPTURANDO A PASTA DE PUBLICAÇÕES
        const caminhoPublicacoes = path.join(rootPath, `./publicacoes/${generoPerfis == 'masculino' ? 'masculinas' : 'femininas'}`)
        const pastasPublicacoes = fs.readdirSync(caminhoPublicacoes)
        const caminhoPasta = selecionarPastaFotos(pastasEscolhidas, pastasPublicacoes, caminhoPublicacoes)
        
        // POSTANDO A FOTO DE PERFIL
        if(alterarFotoPerfil == true){
            await postarFotoPerfil(pagina, usuario, caminhoPasta, logs)
        }

        // ALTERANDO A BIOGRAFIA DO PERFIL
        if(alterarBiografia == true){
            await alterarBiografiaPerfil(pagina, usuario, logs)
        }

        // POSTANDO FOTOS NO FEED
        if(quantidadePublicacoesFeed != 0 && quantidadePublicacoesFeed != '0' && quantidadePublicacoesFeed != ''){
            logs.push(`Postando fotos no Feed`)
            for(let x = 0; x < quantidadePublicacoesFeed; x++){
                const bloqueio = await procurarBloqueios(pagina, usuario, logs)
                if(bloqueio == true){ break }
                await realizarPublicacoesFeed(pagina, x + 1, usuario, caminhoPasta, logs)
            }
        }

        // SEGUINDO PERFIS FAMOSOS
        if(seguirPerfis != 0 && seguirPerfis != '0' && seguirPerfis != ''){
            await seguirPerfisFamosos(pagina, usuario, seguirPerfis, esperarEntre, logs)
        }

        // POSTANDO FOTOS NO STORY
        if(quantidadePublicacoesStory != 0 && quantidadePublicacoesStory != '0' && quantidadePublicacoesStory != ''){
            logs.push(`Postando fotos no story`)
            for(let x = 0; x < quantidadePublicacoesStory; x++){
                const bloqueio2 = await procurarBloqueios(pagina, usuario, logs)
                if(bloqueio2 == true){ break }
                await realizarPublicacoesStory(pagina, x + 1 , usuario, caminhoPasta, logs)
            }
        }

        // CADASTRANDO O PERFIL NO SIGA SOCIAL
        if(userToken != ''){
            await cadastrarPerfilSigaSocial(
                pagina,
                logs,
                usuario,
                userToken,
                quantidadeAcoesSigaSocial,
                metaSigaSocial,
                tempoEntreAcoesSigaSocial
            )

            // FECHANDO O NAVEGADOR
            await navegador.close()
            continue
        }

        // LIMPANDO A ATIVIDADE DE LOGIN
        if(userToken != ''){
            await cadastrarPerfilSigaSocial(
                pagina,
                logs,
                usuario,
                userToken,
                quantidadeAcoesSigaSocial,
                metaSigaSocial,
                tempoEntreAcoesSigaSocial
            )

            // FECHANDO O NAVEGADOR
            await navegador.close()
            continue
        }
        
        if(limparLogin == true){
            if(userToken == ''){
                await limparAtividadeLogin(pagina, usuario, logs)
            }
        }

        // FECHANDO O NAVEGADOR
        await navegador.close()
    }

    // FECHANDO O NAVEGADOR
    logs.push('O robô terminou, pode voltar!')
}

module.exports = montador