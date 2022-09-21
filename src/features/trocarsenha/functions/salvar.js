export function salvar(Mensagem, setMensagem, setConfiguracoesVerificador){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const novaSenha = document.querySelector('[name="novaSenha"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        seusPerfis,
        novaSenha,
        limparLogin,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesVerificador', configuracoes)
    setConfiguracoesVerificador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}