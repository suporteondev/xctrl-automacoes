function logSeguidores(ipcMain){
    ipcMain.on('logSeguidores', (event)=>{
        event.returnValue = global.seguidores
    })
}

module.exports = logSeguidores