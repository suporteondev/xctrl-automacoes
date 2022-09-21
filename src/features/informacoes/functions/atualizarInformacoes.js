import { verificarAcessos } from './verificarAcessos'

async function atualizarInformacoes(
    e, 
    Router,
    nome,
    senha, 
    confirmar,
    Mensagem,
    setMensagem
){

    e.preventDefault()  

    // Configurando a API
    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            nome,
            senha,
            confirmar
        })
    }

    // Chamando a rota de cadastro
    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/geral/informacoes`, configs)
    const resultado = await api.json()

    if(resultado.ok === false){
        setMensagem(<Mensagem color='orange'>{resultado.mensagem}</Mensagem>)
    }else if(resultado.ok === true){
        setMensagem(<Mensagem color='#236EFF'>{resultado.mensagem}</Mensagem>)
    }
}

export { atualizarInformacoes }