function setPerfisGerenciador(ipcMain, store){
    ipcMain.on('setPerfisGerenciador', (event, args)=>{
        event.returnValue = store.set('perfisGerenciador', args)
    })
}

module.exports = setPerfisGerenciador