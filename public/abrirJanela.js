const { join } = require('path')
const { format } = require('url')
const { BrowserWindow, screen } = require('electron')
const isDev = require('electron-is-dev')
var contador = 1

async function abrirJanela(largura, altura, logs){

    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.workAreaSize

    let mainWindow

    if(contador == 1){

        mainWindow = new BrowserWindow({
            autoHideMenuBar: true,
            frame: false,
            show: false,
            resizable: false,
            name: 'xctrl',
            height: 500,
            width: 350,
            title: 'xctrl',
            x: (width / 2) - 175,
            y: (height / 2) - 250,
            icon: __dirname + '/icon.png',
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: true,
                webSecurity: false,
                overlayFullscreenVideo: true,
                enableRemoteModule: true,
                preload: join(__dirname , './preload.js'),
            },
        })

        url = isDev ? `http://localhost:3000` : format({
            pathname: join(__dirname , `./index.html`),
            protocol: 'file:',
            slashes: true,
        })

    }else{

        mainWindow = new BrowserWindow({
            autoHideMenuBar: true,
            frame: false,
            show: false,
            resizable: false,
            name: 'xctrl',
            height: altura,
            width: largura,
            title: 'xctrl',
            x: 0,
            y: 0,
            icon: __dirname + '/icon.png',
            webPreferences: {
                devTools: true,
                nodeIntegration: true,
                contextIsolation: true,
                webSecurity: false,
                overlayFullscreenVideo: true,
                enableRemoteModule: true,
                preload: join(__dirname , './preload.js'),
            },
        })

        url = isDev ? `http://localhost:3000#/${logs}?aba=${contador}` : format({
            pathname: join(__dirname , `./index.html`),
            protocol: 'file:',
            hash: `/${logs}?aba=${contador}`,
            slashes: true,
        })
    }

    mainWindow.setTitle('xctrl')
    mainWindow.loadURL(url)
    mainWindow.setIcon(__dirname + '/icon.png')
    mainWindow.once('ready-to-show', ()=>{
        mainWindow.show()
    })

    contador++

    return mainWindow
}

module.exports = abrirJanela