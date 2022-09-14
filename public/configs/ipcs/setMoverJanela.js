function setMoverJanela(ipcMain, mainWindow, screen){
    ipcMain.on('setMoverJanela', (event, args)=>{
        const { x, y } = args
        const primaryDisplay = screen.getPrimaryDisplay()
        const { height } = primaryDisplay.workAreaSize
        mainWindow.setPosition(x, (height - 320 - y))
        event.returnValue = 'ok'
    })
}

module.exports = setMoverJanela