var contador = 1

const idades = [
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35'
]

const profissoes = [
    'Agronomia',
    'Biotecnologia',
    'Ecologia',
    'Engenharia Ambiental',
    'Engenharia de Pesca',
    'Engenharia Hídrica',
    'Gestão Ambiental',
    'Geologia',
    'Oceanografia',
    'Engenharia Agrícola ',
    'Engenharia de Energia',
    'Engenharia Florestal ',
    'Medicina Veterinária',
    'Meteorologia',
    'Zootecnia',
    'Administração',
    'Recursos Humanos',
    'Arquivologia',
    'Arquitetura e Urbanismo',
    'Biblioteconomia',
    'Ciências Contábeis',
    'Direito',
    'Economia',
    'Educomunicação',
    'Eventos',
    'Jornalismo',
    'Museologia',
    'Pedagogia',
    'Produção Cultural',
    'Produção Editorial',
    'Produção Multimídia',
    'Publicidade e Propaganda',
    'Rádio e TV',
    'Relações Internacionais',
    'Relações Públicas',
    'Secretariado',
    'Serviço Social',
    'Turismo'
]

const localizacoes = [
    'Ceilândia',
    'Samambaia',
    'Plano Piloto',
    'Taguatinga',
    'Planaltina',
    'Guará',
    'Gama',
    'Recanto das Emas',
    'Santa Maria',
    'Águas Claras',
    'São Sebastião',
    'Riacho Fundo II',
    'Sobradinho II',
    'Sobradinho',
    'Vicente Pires',
    'Paranoá',
    'Itapoã',
    'Brazlândia',
    'Riacho Fundo',
    'Arniqueira',
    'Lago Norte',
    'Analândia',
    'Andradina',
    'Bálsamo',
    'Brejo Alegre',
    'Caiabu',
    'Caieiras',
    'Dobrada',
    'Diadema',
    'Elisiário',
    'Estrela do Norte',
    'Fernandópolis'
]

const hobbys = [
    'Andar de bicicleta',
    'Passear com os cachorros',
    'Sair de casa',
    'Andar de moto',
    'Andar de carro',
    'Ver a família',
    'Fazer caminhada',
    'Conversar com os amigos',
    'Sair para a rave',
    'Sair para a balada',
    'Ler livros',
    'Comer besteiras',
    'Apostar corridas',
    'Brincar com as crianças',
    'Treinar esportes',
    'Treinar o corpo',
    'Ir para clubes',
    'Ir ao cinema',
    'Jogar bola',
    'Jogar ping pong',
    'Fumar narguile',
    'Andar de skate',
    'Jogar baralho',
    'Jogar domino'
] 

const alterarBiografiaPerfil = async(pagina, usuario, logs)=>{
    try{

        logs.push('Alterando a biografia')
        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/' + usuario, { timeout: 60000 })

        try{
            logs.push(usuario + ' - Aceitando os cookies')
            await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
            await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
            await pagina.waitForTimeout(5000)
        }catch(erro){
            
        }
            
        logs.push(usuario + ' - Apertando em editar conta.')
        await pagina.waitForSelector('a[href="/accounts/edit/"]', { timeout: 60000 })
        await pagina.click('a[href="/accounts/edit/"]')

        logs.push(usuario + ' - Clicando na biografia.')
        await pagina.waitForSelector('#pepBio', { timeout: 60000 })
        await pagina.click('#pepBio')

        logs.push(usuario + ' - Selecionando a biografia.')
        await pagina.keyboard.down('Control')
        await pagina.keyboard.press('A')
        await pagina.keyboard.up('Control')

        const idade = Math.floor(Math.random() * idades.length)
        const localizacao = Math.floor(Math.random() * localizacoes.length)
        const profissao = Math.floor(Math.random() * profissoes.length)
        const hobby = Math.floor(Math.random() * hobbys.length)

        logs.push(usuario + ' - Digitando a nova biografia.')
        await pagina.waitForSelector('#pepBio', { timeout: 60000 })
        await pagina.type('#pepBio', `
            🎉 | ${idades[idade]} anos
            📍 | ${localizacoes[localizacao]}
            📖 | ${profissoes[profissao]}
            🕒 | ${hobbys[hobby]}
        `)

        logs.push(usuario + ' - Salvando as alterações.')
        await pagina.evaluate(()=>{
            document.querySelectorAll('button').forEach((e)=>{
                if(e.innerText == 'Enviar'){
                    e.click()
                }
            })
        })

        logs.push(usuario + ' - Biografia alterada com sucesso!')
 
        contador = 1
        return true 

    }catch(erro){
        try{
            logs.push(usuario + ' - Não conseguimos alterar a biografia mas iremos tentar novamente.')
            logs.push('Alterando a biografia')
            logs.push(usuario + ' - Redirecionando para o perfil.')
            await pagina.goto('https://www.instagram.com/' + usuario, { timeout: 60000 })

            try{
                logs.push(usuario + ' - Aceitando os cookies')
                await pagina.waitForSelector('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]', { timeout: 5000 })
                await pagina.click('[style="flex: 0 1 auto; flex-direction: row; position: relative; z-index: 0; pointer-events: auto; display: flex; box-sizing: border-box; border-radius: 4px; border: 0px solid rgb(255, 255, 255); cursor: pointer; background: rgb(0, 149, 246); height: 100%; width: 100%; align-items: center; justify-content: center; overflow: hidden; -webkit-box-orient: horizontal; -webkit-box-direction: normal; -webkit-box-align: center; -webkit-box-pack: center;"]')
                await pagina.waitForTimeout(5000)
            }catch(erro){
                
            }
                
            logs.push(usuario + ' - Apertando em editar conta.')
            await pagina.waitForSelector('a[href="/accounts/edit/"]', { timeout: 60000 })
            await pagina.click('a[href="/accounts/edit/"]')

            logs.push(usuario + ' - Clicando na biografia.')
            await pagina.waitForSelector('#pepBio', { timeout: 60000 })
            await pagina.click('#pepBio')

            logs.push(usuario + ' - Selecionando a biografia.')
            await pagina.keyboard.down('Control')
            await pagina.keyboard.press('A')
            await pagina.keyboard.up('Control')

            const idade = Math.floor(Math.random() * idades.length)
            const localizacao = Math.floor(Math.random() * localizacoes.length)
            const profissao = Math.floor(Math.random() * profissoes.length)
            const hobby = Math.floor(Math.random() * hobbys.length)

            logs.push(usuario + ' - Digitando a nova biografia.')
            await pagina.waitForSelector('#pepBio', { timeout: 60000 })
            await pagina.type('#pepBio', `
                🎉 | ${idades[idade]} anos
                📍 | ${localizacoes[localizacao]}
                📖 | ${profissoes[profissao]}
                🕒 | ${hobbys[hobby]}
            `)

            logs.push(usuario + ' - Salvando as alterações.')
            await pagina.evaluate(()=>{
                document.querySelectorAll('button').forEach((e)=>{
                    if(e.innerText == 'Enviar'){
                        e.click()
                    }
                })
            })

            logs.push(usuario + ' - Biografia alterada com sucesso!')
    
            contador = 1
            return true 

        }catch(erro){
            logs.push(usuario + ' - Erro ao tentar alterar a biografia!')
            return false
        }
    }
}

module.exports = alterarBiografiaPerfil