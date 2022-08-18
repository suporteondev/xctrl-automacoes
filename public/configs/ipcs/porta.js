function porta(ipcMain){
    ipcMain.on('porta', (event)=>{
        event.returnValue = global.porta
    })
}

module.exports = porta