function selecionarPerfis(){ 
    
    const checks = document.querySelectorAll('input[type="checkbox"]')
    const minimo = document.querySelector('#selecionarMinimo')
    const maximo = document.querySelector('#selecionarMaximo')

    checks.forEach((check, index)=>{
        if(index >= minimo.value && index <= maximo.value){
            check.checked = true
        }else{
            check.checked = false
        }
    })
}

export { selecionarPerfis }