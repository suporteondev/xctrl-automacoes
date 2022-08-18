function tamanhoMedio(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-medio', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(350, 500)
        BrowserWindow.fromId(id).setResizable(false)

        event.returnValue = true
    })
}

module.exports = tamanhoMedio