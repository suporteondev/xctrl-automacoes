function setPerfisEngajamentos(ipcMain, store){
    ipcMain.on('setPerfisEngajamentos', (event, args)=>{
        event.returnValue = store.set('perfisEngajamentos', args)
    })
}

module.exports = setPerfisEngajamentos