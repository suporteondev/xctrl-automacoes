function setConfiguracoesTrocarSenha(ipcMain, store){
    ipcMain.on('setConfiguracoesTrocarSenha', (event, args)=>{
        event.returnValue = store.set('configuracoesTrocarSenha', args)
    })
}

module.exports = setConfiguracoesTrocarSenha