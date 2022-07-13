const fs = require('fs')
var contador = 1

// let spam1 = await pagina.evaluate(()=>{

//     let refsH2 = document.querySelectorAll('h2')

//     for(let x = 0; x < refsH2.length; x++){

//         // Capturando o H2
//         const elemento = refsH2[x]

//         // Verificando se ocorreu algum SPAM
//         if(elemento.innerText == 'Sua publicação vai contra nossas Diretrizes da Comunidade'){
//             return true
//         }else{
//             return false
//         }
//     }
// })

// if(spam1 == true){

//     // Clicando no botão do spam
//     await pagina.evaluate(()=>{
//         document.querySelectorAll('button').forEach((e)=>{
//             if(e.innerText == 'OK'){
//                 e.click()
//             }
//         })
//     })

//     // Spam
//     logs.push(usuario + ' - A publicação sofreu spam.')
//     await pagina.waitForSelector('a[href="/accounts/edit/"]')

//     throw new Error('Spam')
// }

const realizarPublicacoesFeed = async(pagina, x, usuario, pastaFotos, logs)=>{
    try{

        // CAPTURANDO A PUBLICAÇÃO
        const publicacoes = fs.readdirSync(pastaFotos)
        const publicacao = `${pastaFotos}\\${publicacoes[Math.floor(Math.random() * publicacoes.length)]}`

        // ACESSANDO O PERFIL
        await pagina.goto('https://www.instagram.com/' + usuario)
        await pagina.waitForSelector('svg[aria-label="New publication"]')

        // Selecionando a publicação
        logs.push(`${usuario} - Selecionado a ${x}ª publicação.`)
        const [ uploadPublicacoes ] = await Promise.all([
            pagina.waitForFileChooser(),
            pagina.waitForSelector('svg[aria-label="New publication"]'),
            pagina.click('svg[aria-label="New publication"]')
        ])

        await uploadPublicacoes.accept([ publicacao ])

        //Avançar
        logs.push(usuario + ' - Avançando.')
        await pagina.waitForSelector('button._ab5p')
        await pagina.click('button._ab5p')

        // Compartilhar
        logs.push(usuario + ' - Compartilhando.')
        await pagina.waitForSelector('textarea[aria-label="Escreva uma legenda..."]')
        await pagina.click('button._ab5p')

        // Esperando aparecer o botão de New publication
        await pagina.waitForSelector('svg[aria-label="New publication"]')
        logs.push(usuario + ' - Publicação realizada com sucesso!')

        return true
    }catch(erro){
        console.log(erro.message)

        if(contador == 3){
            logs.push(usuario + ` - Erro ao tentar publicar a ${x} publicação!`)
            return false
        }else{
            logs.push(usuario + ` - Não conseguimos realizar a ${x} publicação, mas iremos tentar novamente.`)
            contador = contador + 1
            await realizarPublicacoesFeed(pagina, x, usuario, pastaFotos, logs)
            contador = 0
            return true
        }
    }
}

module.exports = realizarPublicacoesFeed