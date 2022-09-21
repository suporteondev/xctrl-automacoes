function configuracoesTrocarSenha(store){
    if(
        store.get('configuracoesTrocarSenha') == undefined || 
        store.get('configuracoesTrocarSenha') == 'undefined'
    ){
        store.set('configuracoesTrocarSenha', {
            navegador: 'google',
            verAcontecendo: 'sim',
            modoAnonimo: 'sim',
            userAgent: 'aleatorio',
            modoPerfis: 'linha',
            seusPerfis: '',
            novaSenha: '',
            limparLogin: 'sim',
            esperarEntre: 0
        })
    }
}

module.exports = configuracoesTrocarSenha