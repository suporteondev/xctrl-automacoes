function setUsuarioLogado(ipcMain, store){
    ipcMain.on('setUsuarioLogado', (event, args)=>{
        event.returnValue = store.set('usuarioLogado', args)
    })
}

module.exports = setUsuarioLogado