export function salvar(Mensagem, setMensagem, setConfiguracoesVerificador){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const esperarSegundos = document.querySelector('[name="esperarSegundos"]').value
    const modoVerificacao = document.querySelector('[name="modoVerificacao"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        limparLogin,
        esperarSegundos,
        modoVerificacao
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesVerificador', configuracoes)
    setConfiguracoesVerificador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}