function perfisEngajamentos(store){
    if(
        store.get('perfisEngajamentos') == undefined || 
        store.get('perfisEngajamentos') == 'undefined'
    ){
        store.set('perfisEngajamentos', [])
    }
}

module.exports = perfisEngajamentos