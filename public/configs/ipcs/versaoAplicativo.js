function versaoAplicativo(ipcMain){
    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.4'
    })
}

module.exports = versaoAplicativo