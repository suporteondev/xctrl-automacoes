const fs = require('fs');

async function limparPastaTemp(logs){

    logs.push('Limpando a pasta Temp')

    // CAMINHO DA PASTA TEMP
    const pastaTemp = "C:\\Windows\\Temp\\"

    // ARQUIVOS DA PASTA TEMP
    let arquivosTemp
    try{
        arquivosTemp = fs.readdirSync(pastaTemp)
    }catch(erro){
        logs.push('A pasta Temp não está criada no seu computador!')
        return true
    }

    if(arquivosTemp.length == 0){
        logs.push('Não foram encontrados arquivos na pasta Temp')
        return true
    }

    logs.push('Encontramos ' + arquivosTemp.length +  ' arquivos na pasta Temp')
    logs.push('Apagando os arquivos da pasta Temp')

    // FAZENDO UM LAÇO NOS ARQUIVOS DA PASTA PREFETCH
    for(let x = 0; x < arquivosTemp.length; x++){

        // CAPTURANDO O ARQUIVO
        const arquivo = arquivosTemp[x]

        // APAGANDO ARQUIVO DA PASTA PREFETCH
        fs.rmSync(pastaTemp + '\\' + arquivo, { recursive: true })
    }

    logs.push('Arquivos apagados com sucesso!')

    return true
}

module.exports = limparPastaTemp