const fs = require('fs');

async function limparPastaPrefetch(logs){

    logs.push('Limpando a pasta Prefetch')

    // CAMINHO DA PASTA PREFETCH
    const pastaPrefetch = "C:\\Windows\\Prefetch\\"

    // ARQUIVOS DA PASTA PREFETCH
    let arquivosPrefetch

    try{
        arquivosPrefetch = fs.readdirSync(pastaPrefetch)
    }catch(erro){
        logs.push('A pasta C:\\Windows\\Prefetch não está criada no seu computador!')
        return true
    }

    if(arquivosPrefetch.length == 0){
        logs.push('Não foram encontrados arquivos na pasta Prefetch')
        return true
    }

    logs.push('Foram encontrados ' + arquivosPrefetch.length +  ' arquivos temporários na pasta Prefetch')

    // FAZENDO UM LAÇO NOS ARQUIVOS DA PASTA PREFETCH
    for(let x = 0; x < arquivosPrefetch.length; x++){

        // CAPTURANDO O ARQUIVO
        const arquivo = arquivosPrefetch[x]

        // APAGANDO ARQUIVO DA PASTA PREFETCH
        logs.push('Apagando o arquivo: ' + arquivo)
        fs.rmSync(pastaPrefetch + '\\' + arquivo, { recursive: true })
        logs.push('Arquivo apagado com sucesso!')
    }

    return true
}

module.exports = limparPastaPrefetch