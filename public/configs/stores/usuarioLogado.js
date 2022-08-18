function usuarioLogado(store){
    if(
        store.get('usuarioLogado') == undefined || 
        store.get('usuarioLogado') == 'undefined'
    ){
        store.set('usuarioLogado', false)
    }
}

module.exports = usuarioLogado