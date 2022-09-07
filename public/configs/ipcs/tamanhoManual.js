function tamanhoManual(ipcMain, mainWindow){
    ipcMain.on('tamanho-manual', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(750, 600)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoManual