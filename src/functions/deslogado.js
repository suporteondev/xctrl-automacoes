export function deslogado(Router, tamanho){
    if(
        window.api.ipcRenderer.sendSync('logado') === undefined || 
        window.api.ipcRenderer.sendSync('logado') === 'undefined'
    ){
        Router('/')
    }
    window.api.ipcRenderer.sendSync(tamanho)
}