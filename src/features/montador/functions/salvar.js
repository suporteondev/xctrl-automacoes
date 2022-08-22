export function salvar(Mensagem, setMensagem, setConfiguracoesMontador){

    const navegador = document.querySelector('[name="navegador"]').value
    const verAcontecendo = document.querySelector('[name="verAcontecendo"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const seusPerfis = document.querySelector('[name="seusPerfis"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const alterarFotoPerfil = document.querySelector('[name="alterarFotoPerfil"]').value
    const alterarBiografia = document.querySelector('[name="alterarBiografia"]').value
    const quantidadePublicacoesFeed = document.querySelector('[name="quantidadePublicacoesFeed"]').value
    const quantidadePublicacoesStory = document.querySelector('[name="quantidadePublicacoesStory"]').value
    const seguirPerfis = document.querySelector('[name="seguirPerfis"]').value
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
        generoPerfis,
        alterarFotoPerfil,
        alterarBiografia,
        quantidadePublicacoesFeed,
        quantidadePublicacoesStory,
        seguirPerfis,
        limparLogin,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesMontador', configuracoes)
    setConfiguracoesMontador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}