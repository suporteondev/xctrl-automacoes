function sair(Router){ 
    window.api.ipcRenderer.sendSync('sair')
    Router('/')
}

export { sair }