export function copiarPerfis(){
    document.querySelector('#textarea-perfis').select()
    document.execCommand('copy')
}