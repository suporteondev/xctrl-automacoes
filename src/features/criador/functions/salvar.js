export function salvar(Mensagem, setMensagem, setConfiguracoesCriador){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const emailTemporario = document.querySelector('[name="emailTemporario"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const ondeSalvar = document.querySelector('[name="ondeSalvar"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        emailTemporario,
        quantidadePerfis,
        senhaPerfis,
        generoPerfis,
        limparLogin,
        comoSalvar,
        ondeSalvar,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesCriador', configuracoes)
    setConfiguracoesCriador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}