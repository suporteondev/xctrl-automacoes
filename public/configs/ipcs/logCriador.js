function logCriador(ipcMain){
    ipcMain.on('logCriador', (event)=>{
        event.returnValue = global.criador
    })
}

module.exports = logCriador