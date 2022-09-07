function setConfiguracoesRealizador(ipcMain, store){
    ipcMain.on('setConfiguracoesRealizador', (event, args)=>{
        event.returnValue = store.set('configuracoesRealizador', args)
    })
}

module.exports = setConfiguracoesRealizador