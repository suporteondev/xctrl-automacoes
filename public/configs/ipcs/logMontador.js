function logMontador(ipcMain){
    ipcMain.on('logMontador', (event)=>{
        event.returnValue = global.montador
    })
}

module.exports = logMontador