async function acessarPlataforma(e, email, senha, setMensagem, setNome, Router, setEmail, Mensagem){

    e.preventDefault()  

    // Configurando a API
    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    }

    // Chamando a rota de cadastro
    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/acessar`, configs)
    const resultado = await api.json()

    if(resultado.ok === false){
        setMensagem(<Mensagem color='orange'>{resultado.mensagem}</Mensagem>)
    }else if(resultado.ok === true){
        setMensagem(<Mensagem color='#05A660'>{resultado.mensagem}</Mensagem>)
        setEmail(resultado.email)
        setNome(resultado.nome)

        localStorage.setItem('nome', resultado.nome)
        localStorage.setItem('email', resultado.email)

        setTimeout(()=>{
            Router('/painel')
        }, 2000)
    }
}

export { acessarPlataforma }