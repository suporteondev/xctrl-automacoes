function selecionarPastaFotos(
    pastasEscolhidas,
    pastasPublicacoes,
    caminhoPublicacoes
){

    // SE O TOTAL DAS PASTAS ESCOLHIDAS FOR IGUAL AO TOTAL DAS PASTAS DE PUBLICAÇÕES, ZERA AS PASTAS ESCOLHIDAS
    pastasEscolhidas.length == pastasPublicacoes.length ? pastasEscolhidas = [] : ''

    // SELECIONANDO O CAMINHO DA PASTA DE PUBLICAÇÕES
    const caminhoPasta = `${caminhoPublicacoes}\\${pastasPublicacoes[Math.floor(Math.random() * pastasPublicacoes.length)]}`
    
    // SE O CAMINHO DA PASTA JÁ FOI ESCOLHIDO, ELE TENTA ESCOLHER OUTRA
    if(pastasEscolhidas.indexOf(caminhoPasta) >= 0){
        return selecionarPastaFotos(
            pastasEscolhidas,
            pastasPublicacoes,
            caminhoPublicacoes
        )
    }

    // ADICIONANDO O CAMINHO ESCOLHIDO NAS PASTAS ESCOLHIDAS
    pastasEscolhidas.push(caminhoPasta)

    // RETORNANDO O CAMINHO DA PASTA ESCOLHIDA
    return caminhoPasta
}

module.exports = selecionarPastaFotos