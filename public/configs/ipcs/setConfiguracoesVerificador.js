function setConfiguracoesVerificador(ipcMain, store){
    ipcMain.on('setConfiguracoesVerificador', (event, args)=>{
        event.returnValue = store.set('configuracoesVerificador', args)
    })
}

module.exports = setConfiguracoesVerificador