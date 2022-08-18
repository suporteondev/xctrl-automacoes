function versaoAplicativo(ipcMain){
    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.2'
    })
}

module.exports = versaoAplicativo