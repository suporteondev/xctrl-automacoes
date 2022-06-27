async function clicar(pagina, seletor){
    await pagina.waitForSelector(seletor)
    await pagina.click(seletor)
    await pagina.waitForTimeout(1000)
}

async function acessar(pagina, url){
    await pagina.goto(url)
    await pagina.waitForTimeout(1000)
}

async function escrever(pagina, seletor, texto){
    await pagina.waitForSelector(seletor)
    await pagina.type(seletor, texto, {delay: 25})
    await pagina.waitForTimeout(1000)
}

async function selecionarTudo(pagina){
    await pagina.keyboard.down('Control')
    await pagina.keyboard.press('A')
    await pagina.keyboard.up('Control')
    await pagina.waitForTimeout(1000)
}

async function copiar(pagina){
    await pagina.keyboard.down('Control')
    await pagina.keyboard.press('C')
    await pagina.keyboard.up('Control')
    await pagina.waitForTimeout(1000)
}

async function colar(pagina){
    await pagina.keyboard.down('Control')
    await pagina.keyboard.press('V')
    await pagina.keyboard.up('Control')
    await pagina.waitForTimeout(1000)
}

async function pressionarTecla(pagina, tecla){
    await pagina.keyboard.press(tecla)
    await pagina.waitForTimeout(1000)
}

module.exports = {
    clicar,
    escrever,
    acessar,
    selecionarTudo,
    copiar,
    colar,
    pressionarTecla
}