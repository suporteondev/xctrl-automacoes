function setConfiguracoesSeguidores(ipcMain, store){
    ipcMain.on('setConfiguracoesSeguidores', (event, args)=>{
        event.returnValue = store.set('configuracoesSeguidores', args)
    })
}

module.exports = setConfiguracoesSeguidores