function perfisEngajamentos(ipcMain, store){
    ipcMain.on('perfisEngajamentos', (event)=>{
        event.returnValue = store.get('perfisEngajamentos')
    })
}

module.exports = perfisEngajamentos