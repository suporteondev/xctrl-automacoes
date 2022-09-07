function tamanhoPequeno2x(ipcMain, mainWindow){
    ipcMain.on('tamanho-pequeno-2x', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(350, 300)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoPequeno2x