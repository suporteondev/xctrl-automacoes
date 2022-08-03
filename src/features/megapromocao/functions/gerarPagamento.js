export async function gerarPagamento(setPagamentoGerado, setPixQrCode, setPixCopiaCola){
    const configs = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            servico: 'megapromocao'
        })
    }

    const api = await fetch(`http://localhost:${window.api.ipcRenderer.sendSync('porta')}/api/pagamentos`, configs)
    const resultado = await api.json()

    setPagamentoGerado(true)
    setPixQrCode(`data:image/jpeg;base64,${resultado.qrCode}`)
    setPixCopiaCola(resultado.pixCopiaCola)
}