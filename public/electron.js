const { join } = require('path')
const { format } = require('url')
const { BrowserWindow, app, ipcMain, globalShortcut } = require('electron')
const isDev = require('electron-is-dev')
const server = require('./server')
const Store = require('electron-store')
const store = new Store()

app.on('ready', async () => {

    if(store.get('logado') == undefined || store.get('logado') == 'undefined'){
        store.set('logado', false)
    }

    if(store.get('nome') == undefined || store.get('nome') == 'undefined'){
        store.set('nome', false)
    }

    if(store.get('tema') == undefined || store.get('tema') == 'undefined'){
        store.set('tema', 'light')
    }

    if(store.get('caminhoNavegador') == undefined || store.get('caminhoNavegador') == 'undefined'){
        store.set('caminhoNavegador', '')
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
        // mainWindow.setResizable(false)
        // mainWindow.maximize()
        mainWindow.show()
    })

    // globalShortcut.register('Control+Shift+I', () => {
    //     return false
    // })

    ipcMain.on('fechar', (event)=>{
        mainWindow.close()
    })

    ipcMain.on('minimizar', (event)=>{
        mainWindow.minimize()
    })

    ipcMain.on('porta', (event)=>{
        event.returnValue = global.porta
    })
    
    ipcMain.on('logado', (event)=>{
        event.returnValue = store.get('logado')
    })

    ipcMain.on('nome', (event)=>{
        event.returnValue = store.get('nome')
    })

    ipcMain.on('setTema', (event)=>{
        event.returnValue = store.set('tema', store.get('tema') === 'light' ? 'dark': 'light')
    })

    ipcMain.on('setCaminhoNavegador', (event, args)=>{
        event.returnValue = store.set('caminhoNavegador', args)
    })

    ipcMain.on('caminhoNavegador', (event)=>{
        event.returnValue = store.get('caminhoNavegador')
    })
    
    ipcMain.on('tema', (event)=>{
        event.returnValue = store.get('tema')
    })

    ipcMain.on('logVerificar', (event)=>{
        event.returnValue = global.verificar
    })

    ipcMain.on('logRemoverPerfisGni', (event)=>{
        event.returnValue = global.removerperfisgni
    })

    ipcMain.on('sair', (event)=>{
        event.returnValue = store.delete('logado')
    })

    ipcMain.on('nao-redimensionar', (event)=>{
        if(mainWindow.isMaximized()){
            mainWindow.restore()
        }
        
        mainWindow.setResizable(true)
        mainWindow.setSize(350, 340)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-medio', (event)=>{
        if(mainWindow.isMaximized()){
            mainWindow.restore()
        }

        mainWindow.setResizable(true)
        mainWindow.setSize(350, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-acessar', (event)=>{
        if(mainWindow.isMaximized()){
            mainWindow.restore()
        }

        mainWindow.setResizable(true)
        mainWindow.setSize(350, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('tamanho-gerenciador', (event)=>{
        if(mainWindow.isMaximized()){
            mainWindow.restore()
        }
        
        mainWindow.setResizable(true)
        mainWindow.setSize(650, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })

    ipcMain.on('maximizar', (event)=>{
        if(mainWindow.isMaximized()){
            mainWindow.setResizable(true)
            mainWindow.restore()
            mainWindow.setSize(650, 500)
            mainWindow.setResizable(false)
        }else{
            mainWindow.setResizable(true)
            mainWindow.maximize()
            mainWindow.setResizable(false)
        }
    })
})

app.on('window-all-closed', app.quit)