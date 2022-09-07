function configuracoesRealizador(ipcMain, store){
    ipcMain.on('configuracoesRealizador', (event)=>{
        event.returnValue = store.get('configuracoesRealizador')
    })
}

module.exports = configuracoesRealizador