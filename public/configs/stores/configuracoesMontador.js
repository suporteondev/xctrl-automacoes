function configuracoesMontador(store){
    if(
        store.get('configuracoesMontador') == undefined || 
        store.get('configuracoesMontador') == 'undefined'
    ){
        store.set('configuracoesMontador', {
            navegador: 'google',
            verAcontecendo: 'nao',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            seusPerfis: '',
            generoPerfis: 'feminino',
            alterarFotoPerfil: 'sim',
            alterarBiografia: 'sim',
            quantidadePublicacoesFeed: 10,
            quantidadePublicacoesStory: 3,
            seguirPerfis: 5,
            limparLogin: 'sim',
            cadastrarSigaSocial: 'sim',
            emailSigaSocial: '',
            senhaSigaSocial: '',
            metaSigaSocial: 'unica',
            quantidadeAcoesSigaSocial: '100',
            tempoEntreAcoesSigaSocial: '120',
            esperarEntre: 0
        })
    }
}

module.exports = configuracoesMontador