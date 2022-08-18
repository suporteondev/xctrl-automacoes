function logVerificador(ipcMain){
    ipcMain.on('logVerificador', (event)=>{
        event.returnValue = global.verificador
    })
}

module.exports = logVerificador