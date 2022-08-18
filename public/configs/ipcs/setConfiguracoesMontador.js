function setConfiguracoesMontador(ipcMain, store){
    ipcMain.on('setConfiguracoesMontador', (event, args)=>{
        event.returnValue = store.set('configuracoesMontador', args)
    })
}

module.exports = setConfiguracoesMontador