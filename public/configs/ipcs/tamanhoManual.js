function tamanhoManual(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-manual', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(750, 600)
        BrowserWindow.fromId(id).setResizable(false)

        event.returnValue = true
    })
}

module.exports = tamanhoManual