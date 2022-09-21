const fs = require('fs');

async function limparPastaTemp(logs){

    logs.push('Limpando a pasta Temp')

    try{
        // CAMINHO DA PASTA TEMP
        const pastaTemp = "C:\\Windows\\Temp\\"

        // ARQUIVOS DA PASTA TEMP
        const arquivosTemp = fs.readdirSync(pastaTemp)
 
        // FAZENDO UM LAÇO NOS ARQUIVOS DA PASTA PREFETCH
        for(let x = 0; x < arquivosTemp.length; x++){

            // CAPTURANDO O ARQUIVO
            const arquivo = arquivosTemp[x]

            // APAGANDO ARQUIVO DA PASTA PREFETCH
            fs.rmSync(pastaTemp + '\\' + arquivo, { recursive: true })
        }

        logs.push('Arquivos apagados com sucesso!')

        return true
    }catch(erro){
        logs.push('Arquivos apagados com sucesso!')

        return false
    }
}

module.exports = limparPastaTemp