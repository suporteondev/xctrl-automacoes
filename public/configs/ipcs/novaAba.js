const abrirJanela = require('../../abrirJanela')

async function novaAba(ipcMain){
    ipcMain.on('nova-aba', async(event, args)=>{
        await abrirJanela(args)
        event.returnValue = true
    })
}

module.exports = novaAba