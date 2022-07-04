export function salvar(Mensagem, setMensagem, setConfiguracoesRemovedor){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const emailPlataforma = document.querySelector('[name="emailPlataforma"]').value
    const senhaPlataforma = document.querySelector('[name="senhaPlataforma"]').value
    const tipoAcao = document.querySelector('[name="tipoAcao"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        emailPlataforma,
        senhaPlataforma,
        tipoAcao
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesRemovedor', configuracoes)
    setConfiguracoesRemovedor(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}