function tema(store){
    if(
        store.get('tema') == undefined || 
        store.get('tema') == 'undefined'
    ){
        store.set('tema', 'light')
    }
}

module.exports = tema