function perfisGerenciador(store){
    if(
        store.get('perfisGerenciador') == undefined || 
        store.get('perfisGerenciador') == 'undefined'
    ){
        store.set('perfisGerenciador', [])
    }
}

module.exports = perfisGerenciador