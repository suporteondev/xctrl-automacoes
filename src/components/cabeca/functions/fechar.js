function fechar(){ 
    window.api.ipcRenderer.send('fechar')
}

export { fechar }