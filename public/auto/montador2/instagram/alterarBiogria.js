const atalhos = require('../atalhos')

const alterarBiogria = async(pagina, usuario, biografia, contador, logs)=>{
    try{
       // Verificando se a biografia está vazia e pulando
        if(biografia == false) return true

        logs.push('')
        logs.push('Alterando a biografia')

        // Acessando o perfil do usuário
        logs.push(usuario + ' - Redirecionando para o perfil.')
        await atalhos.acessar(pagina, 'https://www.instagram.com/' + usuario)
            
        // Apertando em editar conta
        logs.push(usuario + ' - Apertando em editar conta.')
        await atalhos.clicar(pagina, 'a[href="/accounts/edit/"]')

        // Clicando na biografia
        logs.push(usuario + ' - Clicando na biografia.')
        await atalhos.clicar(pagina, '#pepBio')

        // Selecionando tudo
        logs.push(usuario + ' - Selecionando tudo.')
        await atalhos.selecionarTudo(pagina)

        // Digitando a nova biografia
        logs.push(usuario + ' - Digitando a nova biografia.')
        await atalhos.escrever(pagina, '#pepBio', biografia)

        // Salvando as alterações
        logs.push(usuario + ' - Salvando as alterações.')
        await pagina.evaluate(()=>{
            document.querySelectorAll('button').forEach((e)=>{
                if(e.innerText == 'Enviar'){
                    e.click()
                }
            })
        })
        
        // Acessando o perfil
        await pagina.waitForTimeout(2000)
        logs.push(usuario + ' - Redirecionando para o perfil.')
        await atalhos.acessar(pagina, 'https://www.instagram.com/' + usuario)

        logs.push(usuario + ' - Biografia alterada com sucesso!')

        return true 
    }catch(erro){
        if(contador < 3){

            logs.push(`${usuario} - Não conseguimos alterar a biografia, mas não se preocupe, estamos tentando novamente!`)

            // Contador de erros
            contador = contador + 1
            
            // Tentando acessar novamente
            return await alterarBiogria(pagina, usuario, biografia, contador, logs)
        }else{
            logs.push(`${usuario} - Não conseguimos alterar a biografia.`)
            return false
        }
    }
}

module.exports = alterarBiogria