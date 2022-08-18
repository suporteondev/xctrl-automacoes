function setConfiguracoesAdicionador(ipcMain, store){
    ipcMain.on('setConfiguracoesAdicionador', (event, args)=>{
        event.returnValue = store.set('configuracoesAdicionador', args)
    })
}

module.exports = setConfiguracoesAdicionador