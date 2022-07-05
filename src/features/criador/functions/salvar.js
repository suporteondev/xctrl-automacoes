export function salvar(Mensagem, setMensagem, setConfiguracoesCriador){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const provedorEmail = document.querySelector('[name="provedorEmail"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const ondeSalvar = document.querySelector('[name="ondeSalvar"]').value
    const esperarSegundos = document.querySelector('[name="esperarSegundos"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        provedorEmail,
        quantidadePerfis,
        generoPerfis,
        senhaPerfis,
        comoSalvar,
        ondeSalvar,
        esperarSegundos
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesCriador', configuracoes)
    setConfiguracoesCriador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}