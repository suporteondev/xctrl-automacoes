export function iniciar(Mensagem, setMensagem){

    // Capturando as configurações
    const caminhoNavegador = document.querySelector('[name="caminhoNavegador"]').value
    const modoInvisivel = document.querySelector('[name="modoInvisivel"]').value
    const modoAnonimo = document.querySelector('[name="modoAnonimo"]').value
    const userAgent = document.querySelector('[name="userAgent"]').value
    const limparLogin = document.querySelector('[name="limparLogin"]').value
    const quantidadePerfis = document.querySelector('[name="quantidadePerfis"]').value
    const esperarSegundos = document.querySelector('[name="esperarSegundos"]').value
    const generoPerfis = document.querySelector('[name="generoPerfis"]').value
    const senhaPerfis = document.querySelector('[name="senhaPerfis"]').value
    const comoSalvar = document.querySelector('[name="comoSalvar"]').value
    const ondeSalvar = document.querySelector('[name="ondeSalvar"]').value
    const logs = document.querySelector('#logs')

    if(caminhoNavegador === ''){
        setMensagem(<Mensagem>Configure o caminho do navegador</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(senhaPerfis === ''){
        setMensagem(<Mensagem>Configure a senha dos perfis</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else if(ondeSalvar === ''){
        setMensagem(<Mensagem>Configure onde salvar os perfis</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }else{
        setMensagem(<Mensagem cor='sucesso'>Criador iniciado com sucesso!</Mensagem>)
        logs.scrollTop = logs.scrollHeight
    }

}