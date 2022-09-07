export function salvar(Mensagem, setMensagem, setConfiguracoesRealizador){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const vincularPerfisNaoCadastrados = document.querySelector('[name="vincularPerfisNaoCadastrados"]').value
    const assistirStoryEntreXAcoes = document.querySelector('[name="assistirStoryEntreXAcoes"]').value
    const assistirStoryPorXSegundos = document.querySelector('[name="assistirStoryPorXSegundos"]').value
    const quantidadeAcoes = document.querySelector('[name="quantidadeAcoes"]').value
    const esperarEntreAcoes = document.querySelector('[name="esperarEntreAcoes"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const qualPlataforma = document.querySelector('[name="qualPlataforma"]').value
    const emailPlataforma = document.querySelector('[name="emailPlataforma"]').value
    const senhaPlataforma = document.querySelector('[name="senhaPlataforma"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        navegador,
        verAcontecendo,
        modoAnonimo,
        userAgent,
        modoPerfis,
        seusPerfis,
        vincularPerfisNaoCadastrados,
        assistirStoryEntreXAcoes,
        assistirStoryPorXSegundos,
        quantidadeAcoes,
        esperarEntreAcoes,
        limparLogin,
        qualPlataforma,
        emailPlataforma,
        senhaPlataforma
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesRealizador', configuracoes)
    setConfiguracoesRealizador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}