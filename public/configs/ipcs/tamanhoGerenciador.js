function tamanhoGerenciador(ipcMain, mainWindow){
    ipcMain.on('tamanho-gerenciador', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(800, 550)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoGerenciador