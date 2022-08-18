function setConfiguracoesCriador(ipcMain, store){
    ipcMain.on('setConfiguracoesCriador', (event, args)=>{
        event.returnValue = store.set('configuracoesCriador', args)
    })
}

module.exports = setConfiguracoesCriador