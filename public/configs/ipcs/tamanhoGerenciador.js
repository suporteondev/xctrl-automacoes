function tamanhoGerenciador(ipcMain, mainWindow){
    ipcMain.on('tamanho-gerenciador', (event)=>{
        mainWindow.setResizable(true)
        mainWindow.setSize(750, 500)
        mainWindow.setResizable(false)
        event.returnValue = true
    })
}

module.exports = tamanhoGerenciador