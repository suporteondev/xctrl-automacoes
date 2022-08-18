function aba(ipcMain, BrowserWindow){
    ipcMain.on('aba', (event)=>{
        const { id } = BrowserWindow.getFocusedWindow()
        event.returnValue = id
    })
}

module.exports = aba