export function salvar(Mensagem, setMensagem, setConfiguracoesMontador){

    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const modoPerfis = document.querySelector('[name="modoPerfis"]').value
    const listaPerfis = document.querySelector('[name="listaPerfis"]').value
    const pastaFotos = document.querySelector('[name="pastaFotos"]').value
    const fotoPerfil = document.querySelector('[name="fotoPerfil"]').value
    const alterarBiografia = document.querySelector('[name="alterarBiografia"]').value
    const quantidadePublicacoes = document.querySelector('[name="quantidadePublicacoes"]').value
    const esperarEntre = document.querySelector('[name="esperarEntre"]').value
    const logs = document.querySelector('#logs')

    const configuracoes = {
        caminhoNavegador,
        modoInvisivel,
        modoAnonimo,
        userAgent,
        generoPerfis,
        modoPerfis,
        listaPerfis: '',
        pastaFotos,
        fotoPerfil,
        alterarBiografia,
        quantidadePublicacoes,
        esperarEntre
    }
    
    window.api.ipcRenderer.sendSync('setConfiguracoesMontador', configuracoes)
    setConfiguracoesMontador(configuracoes)

    setMensagem(<Mensagem cor='sucesso'>Suas configurações foram salvas!</Mensagem>)
    logs.scrollTop = logs.scrollHeight
}