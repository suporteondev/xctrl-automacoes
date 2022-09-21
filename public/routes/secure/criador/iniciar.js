const router = require('express').Router()
const logado = require('../../../middlewares/logado')
const Store = require('electron-store')
const store = new Store()
const axios = require('axios')
const qs = require('qs')
const criador = require('../../../auto/automacoes/criador')

router.post('/', logado, async(req, res)=>{

    const { 
        navegador,
        verAcontecendo,
        navegadorAnonimo,
        userAgent,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        esperarEntre,
        limparPastaPrefetch,
        limparPastaTemp,
        montarPerfis
    } = req.body

    const verAcontecendoConfigurado = verAcontecendo == 'sim' ? false : true
    const navegadorAnonimoConfigurado = navegadorAnonimo == 'sim' ? true : false
    const limparLoginConfigurado = limparLogin == 'sim' ? true : false
    const montarPerfisConfigurado = montarPerfis == 'sim' ? true : false
    const limparPastaPrefetchConfigurado = limparPastaPrefetch == 'sim' ? true : false
    const limparPastaTempConfigurado = limparPastaTemp == 'sim' ? true : false
    let usertoken = ''

    const { 
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        cadastrarSigaSocial,
        emailSigaSocial,
        senhaSigaSocial,
        metaSigaSocial,
        quantidadeAcoesSigaSocial,
        tempoEntreAcoesSigaSocial
    } = store.get('configuracoesMontador')

    const alterarFotoPerfilConfigurado = alterarFotoPerfil == 'sim' ? true : false
    const alterarBiografiaConfigurado = alterarBiografia == 'sim' ? true : false

    global.criador = []

    if(montarPerfis == 'sim'){
        if(cadastrarSigaSocial == 'sim'){
            global.criador.push('Capturando token do siga')
    
            const resultadoCadastrarSigaSocial = await axios.post('https://siga.social/', qs.stringify({
                c: 'api',
                m: 'loginUserC',
                api_key: 'f06dcea2defb2f9b8aa948a3cbac0d17',
                login: emailSigaSocial,
                password: senhaSigaSocial
            })).then(resp => {
                global.criador.push('Token capturado com sucesso!')
                return {
                    ok: true,
                    usertoken: resp.data.data.usertoken
                }
            }).catch(err => {
                global.criador.push('Não conseguimos capturar o token!')
                global.criador.push('Verifique se seu email e senha do siga social no montador estão corretos e tente novamente!')
                global.criador.push('O robô terminou, pode voltar!')
                return {
                    ok: false
                }
            })
    
            if(resultadoCadastrarSigaSocial.ok == false){
                return res.json({
                    ok: true
                })
            }
    
            usertoken = resultadoCadastrarSigaSocial.usertoken
        }
    }

    await criador(
        navegador,
        verAcontecendoConfigurado,
        navegadorAnonimoConfigurado,
        userAgent,
        generoPerfis, 
        senhaPerfis, 
        limparLoginConfigurado,
        comoSalvar,
        quantidadePerfis, 
        emailTemporario, 
        esperarEntre,
        limparPastaPrefetchConfigurado,
        limparPastaTempConfigurado,
        montarPerfisConfigurado,
        alterarFotoPerfilConfigurado,
        alterarBiografiaConfigurado,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        metaSigaSocial,
        quantidadeAcoesSigaSocial,
        tempoEntreAcoesSigaSocial,
        global.criador
    )

    return res.json({
        ok: true
    })
})

module.exports = router