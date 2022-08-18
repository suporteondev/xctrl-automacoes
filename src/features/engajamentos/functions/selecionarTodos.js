function selecionarTodos(){ 
    
    const checks = document.querySelectorAll('input[type="checkbox"]')
    const selecionador = document.querySelector('#selecionador')

    checks.forEach((check)=>{
        check.checked = selecionador.checked
    })
}

export { selecionarTodos }