function versaoAtual(ipcMain, store){
    ipcMain.on('versaoAtual', (event)=>{
        event.returnValue = store.get('versaoAtual')
    })
}

module.exports = versaoAtual