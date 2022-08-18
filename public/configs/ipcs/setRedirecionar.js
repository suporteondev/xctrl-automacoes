function setRedirecionar(ipcMain){
    ipcMain.on('setRedirecionar', (event, args)=>{
        global.redirecionar = args
        event.returnValue = true
    })
}

module.exports = setRedirecionar