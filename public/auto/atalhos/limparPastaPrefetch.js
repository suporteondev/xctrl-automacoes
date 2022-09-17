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
        logs.push('A pasta prefetch não está criada no seu computador!')
        return true
    }

    if(arquivosPrefetch.length == 0){
        logs.push('Não foram encontrados arquivos na pasta Prefetch')
        return true
    }

    logs.push('Encontramos ' + arquivosPrefetch.length +  ' arquivos na pasta Prefetch')
    logs.push('Apagando os arquivos da pasta Prefetch')

    // FAZENDO UM LAÇO NOS ARQUIVOS DA PASTA PREFETCH
    for(let x = 0; x < arquivosPrefetch.length; x++){

        // CAPTURANDO O ARQUIVO
        const arquivo = arquivosPrefetch[x]

        // APAGANDO ARQUIVO DA PASTA PREFETCH
        fs.rmSync(pastaPrefetch + '\\' + arquivo, { recursive: true })
    }

    logs.push('Arquivos apagados com sucesso!')

    return true
}

module.exports = limparPastaPrefetch