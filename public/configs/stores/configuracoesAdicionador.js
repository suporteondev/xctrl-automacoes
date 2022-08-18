function configuracoesAdicionador(store){
    if(
        store.get('configuracoesAdicionador') == undefined || 
        store.get('configuracoesAdicionador') == 'undefined'
    ){
        store.set('configuracoesAdicionador', {
            navegador: 'google',
            verAcontecendo: 'sim',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            esperarEntre: 0
        })
    }
}

module.exports = configuracoesAdicionador