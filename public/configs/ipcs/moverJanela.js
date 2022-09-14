function moverJanela(ipcMain, store){
    ipcMain.on('moverJanela', (event)=>{
        mainWindow.setPosition(x, y)
        event.returnValue = store.get('moverJanela')
    })
}

module.exports = moverJanela