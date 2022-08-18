function logAdicionador(ipcMain){
    ipcMain.on('logAdicionador', (event)=>{
        event.returnValue = global.adicionador
    })
}

module.exports = logAdicionador