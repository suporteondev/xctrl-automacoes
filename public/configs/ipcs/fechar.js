function fechar(ipcMain, mainWindow){
    ipcMain.on('fechar', (event)=>{
        mainWindow.close()
        event.returnValue = true
    })
}

module.exports = fechar