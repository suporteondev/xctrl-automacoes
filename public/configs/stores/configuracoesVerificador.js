function configuracoesVerificador(store){
    if(
        store.get('configuracoesVerificador') == undefined || 
        store.get('configuracoesVerificador') == 'undefined'
    ){
        store.set('configuracoesVerificador', {
            navegador: 'google',
            verAcontecendo: 'sim',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            limparLogin: 'sim',
            esperarEntre: 0
        })
    }
}

module.exports = configuracoesVerificador