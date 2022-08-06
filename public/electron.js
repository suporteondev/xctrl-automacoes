const { join } = require('path')
const { format } = require('url')
const { BrowserWindow, app, ipcMain, globalShortcut } = require('electron')
const isDev = require('electron-is-dev')
const server = require('./server')
const Store = require('electron-store')
const store = new Store()

app.on('ready', async () => {

    // USUÁRIO LOGADO
    if(store.get('usuarioLogado') == undefined || store.get('usuarioLogado') == 'undefined'){
        store.set('usuarioLogado', false)
    }

    if(store.get('tema') == undefined || store.get('tema') == 'undefined'){
        store.set('tema', 'light')
    }

    if(store.get('perfisGerenciador') == undefined || store.get('perfisGerenciador') == 'undefined'){
        store.set('perfisGerenciador', [])
    }

    if(store.get('configuracoesVerificador') == undefined || store.get('configuracoesVerificador') == 'undefined'){
        store.set('configuracoesVerificador', {
            verAcontecendo: 'sim',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            limparLogin: 'sim',
            esperarEntre: 0
        })
    }

    if(store.get('configuracoesRemovedor') == undefined || store.get('configuracoesRemovedor') == 'undefined'){
        store.set('configuracoesRemovedor', {
            caminhoNavegador: '',
            modoInvisivel: 'sim',
            modoAnonimo: 'sim',
            userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36',
            emailPlataforma: '',
            senhaPlataforma: '',
            tipoAcao: 'ver'
        })
    }

    function numeroAleatorio(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }

    if(store.get('configuracoesCriador') == undefined || store.get('configuracoesCriador') == 'undefined'){
        store.set('configuracoesCriador', {
            verAcontecendo: 'sim',
            navegadorAnonimo: 'sim',
            userAgent: 'aleatorio',
            emailTemporario: 'mailtm',
            quantidadePerfis: '999999',
            senhaPerfis: `PadraoXCtrl@${numeroAleatorio(100000, 999999)}`,
            generoPerfis: 'feminino',
            limparLogin: 'sim',
            comoSalvar: 'linha',
            esperarEntre: 0,
            montarPerfis: 'sim'
        })
    }

    if(store.get('configuracoesMontador') == undefined || store.get('configuracoesMontador') == 'undefined'){
        store.set('configuracoesMontador', {
            verAcontecendo: false,
            modoAnonimo: true,
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            generoPerfis: 'feminino',
            alterarFotoPerfil: true,
            alterarBiografia: true,
            quantidadePublicacoesFeed: 10,
            quantidadePublicacoesStory: 3,
            seguirPerfis: 5,
            limparLogin: true,
            esperarEntre: 0
        })
    }

    const porta = server.listen(0, ()=>{
        global.porta = porta.address().port
    })

    const mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        show: false,
        height: 340,
        minHeight: 300,
        minWidth: 300,
        width: 350,
        icon: __dirname + '/icon.png',
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
            contextIsolation: true,
            webSecurity: false,
            overlayFullscreenVideo: true,
            enableRemoteModule: true,
            preload: join(__dirname, 'preload.js'),
        },
    })

    mainWindow.setIcon(__dirname + '/icon.png')
    const url = isDev
        ? `http://localhost:3000`
        : format({
            pathname: join(__dirname, '../build/index.html'),
            protocol: 'file:',
            slashes: true,
        })

    mainWindow.loadURL(url)
    mainWindow.once('ready-to-show', ()=>{
        mainWindow.show()
    })

    globalShortcut.register('Control+Shift+I', () => {
        return false
    })

    ipcMain.on('fechar', (event)=>{
        mainWindow.close()
    })

    ipcMain.on('minimizar', (event)=>{
        mainWindow.minimize()
    })

    ipcMain.on('porta', (event)=>{
        event.returnValue = global.porta
    })

    ipcMain.on('setTema', (event)=>{
        event.returnValue = store.set('tema', store.get('tema') === 'light' ? 'dark': 'light')
    })

    ipcMain.on('setPerfisGerenciador', (event, args)=>{
        event.returnValue = store.set('perfisGerenciador', args)
    })

    ipcMain.on('perfisGerenciador', (event)=>{
        event.returnValue = store.get('perfisGerenciador')
    })

    ipcMain.on('setConfiguracoesVerificador', (event, args)=>{
        event.returnValue = store.set('configuracoesVerificador', args)
    })

    ipcMain.on('configuracoesVerificador', (event)=>{
        event.returnValue = store.get('configuracoesVerificador')
    })

    ipcMain.on('setConfiguracoesRemovedor', (event, args)=>{
        event.returnValue = store.set('configuracoesRemovedor', args)
    })

    ipcMain.on('configuracoesRemovedor', (event)=>{
        event.returnValue = store.get('configuracoesRemovedor')
    })

    ipcMain.on('setConfiguracoesCriador', (event, args)=>{
        event.returnValue = store.set('configuracoesCriador', args)
    })

    ipcMain.on('configuracoesCriador', (event)=>{
        event.returnValue = store.get('configuracoesCriador')
    })

    ipcMain.on('setConfiguracoesMontador', (event, args)=>{
        event.returnValue = store.set('configuracoesMontador', args)
    })

    ipcMain.on('configuracoesMontador', (event)=>{
        event.returnValue = store.get('configuracoesMontador')
    })

    ipcMain.on('setUsuarioLogado', (event, args)=>{
        event.returnValue = store.set('usuarioLogado', args)
    })

    ipcMain.on('usuarioLogado', (event)=>{
        event.returnValue = store.get('usuarioLogado')
    })

    ipcMain.on('tema', (event)=>{
        event.returnValue = store.get('tema')
    })

    ipcMain.on('logVerificador', (event)=>{
        event.returnValue = global.verificador
    })

    ipcMain.on('logRemovedor', (event)=>{
        event.returnValue = global.removedor
    })

    ipcMain.on('logCriador', (event)=>{
        event.returnValue = global.criador
    })

    ipcMain.on('logMontador', (event)=>{
        event.returnValue = global.montador
    })

    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.0'
    })

    ipcMain.on('versaoAtual', (event)=>{
        event.returnValue = store.get('versaoAtual')
    })

    ipcMain.on('sair', (event)=>{
        event.returnValue = store.delete('usuarioLogado')
    })

    ipcMain.on('tamanho-pequeno', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(300, 300)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-pequeno-2x', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(350, 300)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-pequeno-3x', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(450, 320)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-medio', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(350, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-gerenciador', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(750, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-manual', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(750, 600)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
})

app.on('window-all-closed', app.quit)