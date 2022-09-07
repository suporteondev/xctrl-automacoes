function logRealizador(ipcMain){
    ipcMain.on('logRealizador', (event)=>{
        event.returnValue = global.realizador
    })
}

module.exports = logRealizador