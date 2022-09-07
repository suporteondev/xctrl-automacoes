function configuracoesRealizador(store){
    if(
        store.get('configuracoesRealizador') == undefined || 
        store.get('configuracoesRealizador') == 'undefined'
    ){
        store.set('configuracoesRealizador', {
            navegador: 'google',
            verAcontecendo: 'nao',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            seusPerfis: '',
            vincularPerfisNaoCadastrados: 'sim',
            assistirStoryEntreXAcoes: 10,
            assistirStoryPorXSegundos: 30,
            quantidadeAcoes: 50,
            esperarEntreAcoes: 0,
            limparLogin: 'sim',
            qualPlataforma: 'gni',
            emailPlataforma: '',
            senhaPlataforma: ''
        })
    }
}

module.exports = configuracoesRealizador