function tamanhoPequeno2x(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-pequeno-2x', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(350, 300)
        BrowserWindow.fromId(id).setResizable(false)

        event.returnValue = true
    })
}

module.exports = tamanhoPequeno2x