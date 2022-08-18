function minimizar(ipcMain, BrowserWindow){
    ipcMain.on('minimizar', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()
        return BrowserWindow.fromId(id).minimize()
    })
}

module.exports = minimizar