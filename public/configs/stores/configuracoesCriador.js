function numeroAleatorio(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function configuracoesCriador(store){
    if(
        store.get('configuracoesCriador') == undefined || 
        store.get('configuracoesCriador') == 'undefined'
    ){
        store.set('configuracoesCriador', {
            navegador: 'google',
            verAcontecendo: 'sim',
            navegadorAnonimo: 'sim',
            userAgent: 'aleatorio',
            emailTemporario: 'aleatorio',
            quantidadePerfis: '999999',
            senhaPerfis: `PadraoXCtrl@${numeroAleatorio(100000, 999999)}`,
            generoPerfis: 'feminino',
            limparLogin: 'sim',
            comoSalvar: 'linha',
            esperarEntre: 0,
            limparPastaPrefetch: 'sim',
            limparPastaTemp: 'sim',
            montarPerfis: 'sim'
        })
    }
}

module.exports = configuracoesCriador