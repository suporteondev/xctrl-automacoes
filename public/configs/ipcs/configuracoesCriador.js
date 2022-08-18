function configuracoesCriador(ipcMain, store){
    ipcMain.on('configuracoesCriador', (event)=>{
        event.returnValue = store.get('configuracoesCriador')
    })
}

module.exports = configuracoesCriador