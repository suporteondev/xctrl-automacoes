function setTema(ipcMain, store){
    ipcMain.on('setTema', (event)=>{
        event.returnValue = store.set('tema', store.get('tema') === 'light' ? 'dark': 'light')
    })
}

module.exports = setTema