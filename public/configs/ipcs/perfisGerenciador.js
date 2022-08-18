function perfisGerenciador(ipcMain, store){
    ipcMain.on('perfisGerenciador', (event)=>{
        event.returnValue = store.get('perfisGerenciador')
    })
}

module.exports = perfisGerenciador