export function salvar(Mensagem, setMensagem, setConfiguracoesVerificador){

    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        limparLogin,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesVerificador', configuracoes)
    setConfiguracoesVerificador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}