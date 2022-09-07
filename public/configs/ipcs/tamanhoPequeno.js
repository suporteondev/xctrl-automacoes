function tamanhoPequeno(ipcMain, mainWindow){
    ipcMain.on('tamanho-pequeno', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(300, 300)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoPequeno