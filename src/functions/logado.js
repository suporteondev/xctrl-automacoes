export function logado(Router, tamanho){
    if(
        window.api.ipcRenderer.sendSync('logado') !== false &&
        window.api.ipcRenderer.sendSync('logado') !== undefined &&
        window.api.ipcRenderer.sendSync('logado') !== 'undefined'
    ){
        Router('/painel')
    }
    window.api.ipcRenderer.sendSync(tamanho)
}