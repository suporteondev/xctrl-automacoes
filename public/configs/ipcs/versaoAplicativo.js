function versaoAplicativo(ipcMain){
    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.5'
    })
}

module.exports = versaoAplicativo