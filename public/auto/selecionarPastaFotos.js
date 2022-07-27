async function selecionarPastaFotos(
    pastaEscolhida,
    pastas,
    caminhoPastaFotos,
    caminhoPasta
){

    pastaEscolhida.length == pastas.length ? pastaEscolhida = [] : ''
    caminhoPasta = `${caminhoPastaFotos}\\${pastas[Math.floor(Math.random() * pastas.length)]}`
    if(pastaEscolhida.indexOf(caminhoPasta) >=0){
        return selecionarPastaFotos()
    }
    return pastaEscolhida.push(caminhoPasta)
}

module.exports = selecionarPastaFotos