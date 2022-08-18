function configuracoesVerificador(ipcMain, store){
    ipcMain.on('configuracoesVerificador', (event)=>{
        event.returnValue = store.get('configuracoesVerificador')
    })
}

module.exports = configuracoesVerificador