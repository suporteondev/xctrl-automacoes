const fs = require('fs');

async function limparPastaPrefetch(logs){

    logs.push('Limpando a pasta Prefetch')

    try{
        // CAMINHO DA PASTA PREFETCH
        const pastaPrefetch = "C:\\Windows\\Prefetch\\"

        // ARQUIVOS DA PASTA PREFETCH
        const arquivosPrefetch = fs.readdirSync(pastaPrefetch)

        // FAZENDO UM LAÇO NOS ARQUIVOS DA PASTA PREFETCH
        for(let x = 0; x < arquivosPrefetch.length; x++){

            // CAPTURANDO O ARQUIVO
            const arquivo = arquivosPrefetch[x]

            // APAGANDO ARQUIVO DA PASTA PREFETCH
            fs.rmSync(pastaPrefetch + '\\' + arquivo, { recursive: true })
        }

        logs.push('Arquivos apagados com sucesso!')

        return true
    }catch(erro){
        logs.push('Arquivos apagados com sucesso!')

        return false
    }
}

module.exports = limparPastaPrefetch