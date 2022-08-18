function tamanhoGerenciador(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-gerenciador', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(750, 500)
        BrowserWindow.fromId(id).setResizable(false)

        event.returnValue = true
    })
}

module.exports = tamanhoGerenciador