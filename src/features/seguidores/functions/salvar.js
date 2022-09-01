export function salvar(Mensagem, setMensagem, setConfiguracoesVerificador){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        navegador,
        verAcontecendo,
        modoAnonimo,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesSeguidores', configuracoes)
    setConfiguracoesVerificador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}