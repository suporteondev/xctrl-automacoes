function minimizar(){ 
    window.api.ipcRenderer.send('minimizar')
}

export { minimizar }