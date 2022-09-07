function tamanhoMedio(ipcMain, mainWindow){
    ipcMain.on('tamanho-medio', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(350, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoMedio