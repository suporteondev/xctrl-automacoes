function minimizar(ipcMain, mainWindow){
    ipcMain.on('minimizar', (event)=>{
        mainWindow.minimize()
        event.returnValue = true
    })
}

module.exports = minimizar