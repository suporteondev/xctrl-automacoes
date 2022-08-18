function usuarioLogado(ipcMain, store){
    ipcMain.on('usuarioLogado', (event)=>{
        event.returnValue = store.get('usuarioLogado')
    })
}

module.exports = usuarioLogado