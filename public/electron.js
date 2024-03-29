const { join } = require('path')
const { format } = require('url')
const { BrowserWindow, app, ipcMain, globalShortcut } = require('electron')
const { rootPath } = require('electron-root-path')
const isDev = require('electron-is-dev')
const server = require('./server')
const Store = require('electron-store')
const store = new Store()
const fs = require('fs')

// STORES
const configuracoesVerificador = require('./configs/stores/configuracoesVerificador')
const configuracoesTrocarSenha = require('./configs/stores/configuracoesTrocarSenha')
const configuracoesCriador = require('./configs/stores/configuracoesCriador')
const configuracoesMontador = require('./configs/stores/configuracoesMontador')
const configuracoesAdicionador = require('./configs/stores/configuracoesAdicionador')
const configuracoesSeguidores = require('./configs/stores/configuracoesSeguidores')
const configuracoesRealizador = require('./configs/stores/configuracoesRealizador')
const tema = require('./configs/stores/tema')
const usuarioLogado = require('./configs/stores/usuarioLogado')
const perfisGerenciador = require('./configs/stores/perfisGerenciador')
const perfisEngajamentos = require('./configs/stores/perfisEngajamentos')

// ATALHOS
const esconderConsole = require('./configs/atalhos/esconderConsole')

// IPCS
const usuarioLogadoIPC = require('./configs/ipcs/usuarioLogado')
const setUsuarioLogadoIPC = require('./configs/ipcs/setUsuarioLogado')
const temaIPC = require('./configs/ipcs/tema')
const fecharIPC = require('./configs/ipcs/fechar')
const minimizarIPC = require('./configs/ipcs/minimizar')
const portaIPC = require('./configs/ipcs/porta')
const setTemaIPC = require('./configs/ipcs/setTema')
const perfisGerenciadorIPC = require('./configs/ipcs/perfisGerenciador')
const setPerfisGerenciadorIPC = require('./configs/ipcs/setPerfisGerenciador')
const perfisEngajamentosIPC = require('./configs/ipcs/perfisEngajamentos')
const setPerfisEngajamentosIPC = require('./configs/ipcs/setPerfisEngajamentos')
const configuracoesVerificadorIPC = require('./configs/ipcs/configuracoesVerificador')
const setConfiguracoesVerificadorIPC = require('./configs/ipcs/setConfiguracoesVerificador')
const configuracoesTrocarSenhaIPC = require('./configs/ipcs/configuracoesTrocarSenha')
const setConfiguracoesTrocarSenhaIPC = require('./configs/ipcs/setConfiguracoesTrocarSenha')
const tamanhoPequenoIPC = require('./configs/ipcs/tamanhoPequeno')
const tamanhoPequeno2xIPC = require('./configs/ipcs/tamanhoPequeno2x')
const tamanhoPequeno3xIPC = require('./configs/ipcs/tamanhoPequeno3x')
const tamanhoMedioIPC = require('./configs/ipcs/tamanhoMedio')
const tamanhoGerenciadorIPC = require('./configs/ipcs/tamanhoGerenciador')
const tamanhoManualIPC = require('./configs/ipcs/tamanhoManual')
const configuracoesCriadorIPC = require('./configs/ipcs/configuracoesCriador')
const setConfiguracoesCriadorIPC = require('./configs/ipcs/setConfiguracoesCriador')
const configuracoesMontadorIPC = require('./configs/ipcs/configuracoesMontador')
const setConfiguracoesMontadorIPC = require('./configs/ipcs/setConfiguracoesMontador')
const configuracoesAdicionadorIPC = require('./configs/ipcs/configuracoesAdicionador')
const setConfiguracoesAdicionadorIPC = require('./configs/ipcs/setConfiguracoesAdicionador')
const configuracoesSeguidoresIPC = require('./configs/ipcs/configuracoesSeguidores')
const setConfiguracoesSeguidoresIPC = require('./configs/ipcs/setConfiguracoesSeguidores')
const setConfiguracoesRealizadorIPC = require('./configs/ipcs/setConfiguracoesRealizador')
const logVerificadorIPC = require('./configs/ipcs/logVerificador')
const logCriadorIPC = require('./configs/ipcs/logCriador')
const logMontadorIPC = require('./configs/ipcs/logMontador')
const logAdicionadorIPC = require('./configs/ipcs/logAdicionador')
const logSeguidoresIPC = require('./configs/ipcs/logSeguidores')
const logRealizadorIPC = require('./configs/ipcs/logRealizador')
const logTrocarSenhaIPC = require('./configs/ipcs/logTrocarSenha')
const versaoAplicativoIPC = require('./configs/ipcs/versaoAplicativo')
const versaoAtualIPC = require('./configs/ipcs/versaoAtual')
const abrirJanela = require('./abrirJanela')
const redirecionar = require('./configs/ipcs/redirecionar')
const setRedirecionar = require('./configs/ipcs/setRedirecionar')
const novaAba = require('./configs/ipcs/novaAba')
const configuracoesRealizadorIPC = require('./configs/ipcs/configuracoesRealizador')

app.on('ready', async () => {   

    const portaEscolhida = server.listen(0, ()=>{
        global.porta = portaEscolhida.address().port
    })

    const mainWindow = await abrirJanela(350, 550, '')

    // ATALHOS
    // esconderConsole(globalShortcut)

    // STORES
    usuarioLogado(store)
    tema(store)
    perfisGerenciador(store)
    perfisEngajamentos(store)
    configuracoesVerificador(store)
    configuracoesTrocarSenha(store)
    configuracoesCriador(store)
    configuracoesMontador(store)
    configuracoesAdicionador(store)
    configuracoesSeguidores(store)
    configuracoesRealizador(store)

    // IPCS
    setRedirecionar(ipcMain)
    redirecionar(ipcMain)
    novaAba(ipcMain)
    usuarioLogadoIPC(ipcMain, store)
    setUsuarioLogadoIPC(ipcMain, store)
    temaIPC(ipcMain, store)
    portaIPC(ipcMain)
    setTemaIPC(ipcMain, store)
    perfisGerenciadorIPC(ipcMain, store)
    setPerfisGerenciadorIPC(ipcMain, store)
    perfisEngajamentosIPC(ipcMain, store)
    setPerfisEngajamentosIPC(ipcMain, store)
    configuracoesVerificadorIPC(ipcMain, store)
    setConfiguracoesVerificadorIPC(ipcMain, store)
    configuracoesTrocarSenhaIPC(ipcMain, store)
    setConfiguracoesTrocarSenhaIPC(ipcMain, store)
    configuracoesCriadorIPC(ipcMain, store)
    setConfiguracoesCriadorIPC(ipcMain, store)
    configuracoesMontadorIPC(ipcMain, store)    
    setConfiguracoesMontadorIPC(ipcMain, store)    
    configuracoesAdicionadorIPC(ipcMain, store)
    setConfiguracoesAdicionadorIPC(ipcMain, store)
    configuracoesSeguidoresIPC(ipcMain, store)
    setConfiguracoesSeguidoresIPC(ipcMain, store)
    setConfiguracoesRealizadorIPC(ipcMain, store)
    configuracoesRealizadorIPC(ipcMain, store)
    logVerificadorIPC(ipcMain)
    logTrocarSenhaIPC(ipcMain)
    logCriadorIPC(ipcMain)
    logMontadorIPC(ipcMain)
    logAdicionadorIPC(ipcMain)
    logSeguidoresIPC(ipcMain)    
    logRealizadorIPC(ipcMain)
    versaoAplicativoIPC(ipcMain)
    versaoAtualIPC(ipcMain, store)
    fecharIPC(ipcMain, mainWindow)
    minimizarIPC(ipcMain, mainWindow)
    tamanhoPequenoIPC(ipcMain, mainWindow)
    tamanhoPequeno2xIPC(ipcMain, mainWindow)
    tamanhoPequeno3xIPC(ipcMain, mainWindow)
    tamanhoMedioIPC(ipcMain, mainWindow)
    tamanhoGerenciadorIPC(ipcMain, mainWindow)
    tamanhoManualIPC(ipcMain, mainWindow)
})

app.on('window-all-closed', app.quit)