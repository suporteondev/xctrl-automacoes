function maximizar(){ 
    window.api.ipcRenderer.send('maximizar')
}

export { maximizar }