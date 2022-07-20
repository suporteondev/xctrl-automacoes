async function acessarPlataforma(
    e, 
    Router, 
    email, 
    senha, 
    Mensagem, 
    setMensagem,
    setUsuarioLogado
){

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
        
        const usuarioLogado = {
            nome: resultado.nome,
            email: resultado.email,
            senha: senha
        }

        setUsuarioLogado(usuarioLogado)
        window.api.ipcRenderer.sendSync('setUsuarioLogado', usuarioLogado)

        setTimeout(()=>{
            setMensagem(<Mensagem color='#05A660'>Estamos verificando seus acessos...</Mensagem>)
        }, 2000)

        setTimeout(()=>{
            Router('/painel')
        }, 4000)
    }
}

export { acessarPlataforma }