function configuracoesSeguidores(store){
    if(
        store.get('configuracoesSeguidores') == undefined || 
        store.get('configuracoesSeguidores') == 'undefined'
    ){
        store.set('configuracoesSeguidores', {
            navegador: 'google',
            verAcontecendo: 'sim',
            modoAnonimo: 'sim',
            quantidadeSeguidores: '0',
            esperarEntre: 0
        })
    }
}

module.exports = configuracoesSeguidores