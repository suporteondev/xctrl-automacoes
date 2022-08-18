function configuracoesAdicionador(ipcMain, store){
    ipcMain.on('configuracoesAdicionador', (event)=>{
        event.returnValue = store.get('configuracoesAdicionador')
    })
}

module.exports = configuracoesAdicionador