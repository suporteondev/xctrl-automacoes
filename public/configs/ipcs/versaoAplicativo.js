function versaoAplicativo(ipcMain){
    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.3'
    })
}

module.exports = versaoAplicativo