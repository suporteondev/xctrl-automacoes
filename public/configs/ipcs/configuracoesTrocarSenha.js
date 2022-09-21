function configuracoesTrocarSenha(ipcMain, store){
    ipcMain.on('configuracoesTrocarSenha', (event)=>{
        event.returnValue = store.get('configuracoesTrocarSenha')
    })
}

module.exports = configuracoesTrocarSenha