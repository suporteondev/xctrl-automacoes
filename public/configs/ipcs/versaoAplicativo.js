function versaoAplicativo(ipcMain){
    ipcMain.on('versaoAplicativo', (event)=>{
        event.returnValue = '1.0.6'
    })
}

module.exports = versaoAplicativo