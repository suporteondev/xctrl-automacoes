function configuracoesSeguidores(ipcMain, store){
    ipcMain.on('configuracoesSeguidores', (event)=>{
        event.returnValue = store.get('configuracoesSeguidores')
    })
}

module.exports = configuracoesSeguidores