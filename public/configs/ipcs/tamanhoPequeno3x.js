function tamanhoPequeno3x(ipcMain, mainWindow){
    ipcMain.on('tamanho-pequeno-3x', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(450, 320)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoPequeno3x