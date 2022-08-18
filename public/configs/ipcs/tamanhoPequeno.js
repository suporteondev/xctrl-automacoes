function tamanhoPequeno(ipcMain, BrowserWindow){
    ipcMain.on('tamanho-pequeno', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()

        BrowserWindow.fromId(id).setResizable(true)
        BrowserWindow.fromId(id).setSize(300, 300)
        BrowserWindow.fromId(id).setResizable(false)
        
        event.returnValue = true
    })
}

module.exports = tamanhoPequeno