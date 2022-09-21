function logTrocarSenha(ipcMain){
    ipcMain.on('logTrocarSenha', (event)=>{
        event.returnValue = global.trocarsenha
    })
}

module.exports = logTrocarSenha