function tema(ipcMain, store){
    ipcMain.on('tema', (event)=>{
        event.returnValue = store.get('tema')
    })
}

module.exports = tema