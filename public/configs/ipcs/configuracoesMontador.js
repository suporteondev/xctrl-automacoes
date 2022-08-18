function configuracoesMontador(ipcMain, store){
    ipcMain.on('configuracoesMontador', (event)=>{
        event.returnValue = store.get('configuracoesMontador')
    })
}

module.exports = configuracoesMontador