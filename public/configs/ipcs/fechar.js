function fechar(ipcMain, BrowserWindow){
    ipcMain.on('fechar', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()
        return BrowserWindow.fromId(id).close()
    })
}

module.exports = fechar