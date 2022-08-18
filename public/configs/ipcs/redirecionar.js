function redirecionar(ipcMain){
    ipcMain.on('redirecionar', (event)=>{
        event.returnValue = global.redirecionar
    })
}

module.exports = redirecionar