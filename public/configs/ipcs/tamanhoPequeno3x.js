function tamanhoPequeno3x(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-pequeno-3x', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(450, 320)
        BrowserWindow.fromId(id).setResizable(false)

        event.returnValue = true
    })
}

module.exports = tamanhoPequeno3x