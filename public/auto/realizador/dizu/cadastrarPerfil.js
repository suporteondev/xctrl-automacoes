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

const cadastrarPerfilDIZU = async(pagina, paginaInstagram, usuario, logs)=>{
    try{

        // ACESSANDO O GNI
        logs.push('Adicionando o perfil na plataforma')
        await pagina.bringToFront()
        logs.push(usuario + ' - Acessando a gerência')
        await pagina.goto('https://painel.dizu.com.br/painel/perfis_lista')

        // PESQUISANDO O USUÁRIO DO PERFIL
        logs.push(usuario + ' - Selecionando o Instagram')
        await pagina.waitForSelector('[id="instagram-tab"]')
        await pagina.click('[id="instagram-tab"]')
        await pagina.waitForTimeout(2000)

        // SELECIONANDO OS FILTROS AVANÇADOS
        logs.push(usuario + ' - Selecionando o filtro: Ativos')
        await pagina.waitForSelector('[id="filtrarPerfisStatus"]')
        await pagina.evaluate(()=>{
            return document.querySelector('[id="filtrarPerfisStatus"]').value = '1'
        })

        logs.push(usuario + ' - Mostrando os filtros avançados')
        await pagina.waitForSelector('[name="avancados"]')
        await pagina.click('[name="avancados"]')
        await pagina.waitForTimeout(2000)

        // PESQUISANDO O USUÁRIO DO PERFIL
        logs.push(usuario + ' - Procurando o usuário')
        await pagina.waitForSelector('[id="filtrarPerfisUsername"]')
        await pagina.type('[id="filtrarPerfisUsername"]', usuario)
        await pagina.waitForTimeout(2000)
        await pagina.click('[class="btn btn-primary mb-2"]')

        
        try{

            // VERIFICANDO SE O PERFIL JÁ FOI CADASTRADO
            logs.push(usuario + ' - Esperando carregar')
            await pagina.waitForSelector('[id="formMassGroups"]', { timeout: 10000 })
            logs.push(usuario + ` - Perfil encontrado com sucesso!`)

            return true

        }catch(erro){
            
            // ACESSANDO O GNI
            logs.push(usuario + ` - Perfil não encontrado!`)
            logs.push(usuario + ' - Cadastrando o perfil')
            
            // ACESSANDO A PARTE DE ADICIONAR PERFIS DO GNR
            logs.push(usuario + ' - Acessando a plataforma')
            await pagina.goto('https://painel.dizu.com.br/painel/perfis')

            // DIGITANDO O USUÁRIO DO PERFIL
            logs.push(usuario + ' - Digitando o usuário')
            await pagina.waitForSelector('[id="validationDefaultUsername"]')
            await pagina.type('[id="validationDefaultUsername"]', `@${usuario}`)
            await pagina.waitForTimeout(2000)

            // CONFIRMANDO QUE O PERFIL SEGUE AS NORMAS DA DIZU
            logs.push(usuario + ' - Confirmo que meu perfil segue as normas da plataforma!')
            await pagina.waitForSelector('[id="conta20"]')
            await pagina.click('[id="conta20"]')
            
            // CAPTURANDO O CÓDIGO DE CADASTRO
            logs.push(usuario + ' - Capturando o código')
            await pagina.waitForSelector('[id="proveQueEhvoceTxt"]')
            const codigo = await pagina.evaluate(()=>{
                return document.querySelector('[id="proveQueEhvoceTxt"]').value
            })

            // TRAZENDO O INSTAGRAM PARA FRENTE
            logs.push(usuario + ' - Acessando o perfil')
            await paginaInstagram.bringToFront()
            await paginaInstagram.goto('https://www.instagram.com/accounts/edit/')

            logs.push(usuario + ' - Clicando na biografia')
            await paginaInstagram.waitForSelector('#pepBio')
            await paginaInstagram.click('#pepBio')

            logs.push(usuario + ' - Selecionando tudo')
            await paginaInstagram.keyboard.down('Control')
            await paginaInstagram.keyboard.press('A')
            await paginaInstagram.keyboard.up('Control')

            logs.push(usuario + ' - Digitando a nova biografia')
            await paginaInstagram.waitForSelector('#pepBio')
            await paginaInstagram.type('#pepBio', codigo)

            logs.push(usuario + ' - Salvando as alterações')
            await paginaInstagram.evaluate(()=>{
                document.querySelectorAll('button').forEach((e)=>{
                    if(e.innerText == 'Enviar'){
                        e.click()
                    }
                })
            })
            await paginaInstagram.waitForTimeout(5000)

            logs.push(usuario + ' - Finalizando o cadastro')
            await pagina.bringToFront()
            await pagina.waitForSelector('button[type="submit"]')
            await pagina.click('button[type="submit"]')
            await pagina.waitForTimeout(5000)

            logs.push(usuario + ' - Acessando o perfil')
            await paginaInstagram.bringToFront()

            logs.push(usuario + ' - Clicando na biografia')
            await paginaInstagram.waitForSelector('#pepBio')
            await paginaInstagram.click('#pepBio')

            logs.push(usuario + ' - Selecionando tudo')
            await paginaInstagram.keyboard.down('Control')
            await paginaInstagram.keyboard.press('A')
            await paginaInstagram.keyboard.up('Control')

            logs.push(usuario + ' - Digitando a nova biografia')
            const idade = Math.floor(Math.random() * idades.length)
            const localizacao = Math.floor(Math.random() * localizacoes.length)
            const profissao = Math.floor(Math.random() * profissoes.length)
            const hobby = Math.floor(Math.random() * hobbys.length)
            await paginaInstagram.waitForSelector('#pepBio')
            await paginaInstagram.type('#pepBio', `
                🎉 | ${idades[idade]} anos
                📍 | ${localizacoes[localizacao]}
                📖 | ${profissoes[profissao]}
                🕒 | ${hobbys[hobby]}
            `)

            logs.push(usuario + ' - Salvando as alterações')
            await paginaInstagram.evaluate(()=>{
                document.querySelectorAll('button').forEach((e)=>{
                    if(e.innerText == 'Enviar'){
                        e.click()
                    }
                })
            })

            await paginaInstagram.waitForTimeout(5000)

            await pagina.bringToFront()
            logs.push(usuario + ' - Acessando a gerência')
            await pagina.goto('https://painel.dizu.com.br/painel/perfis_lista')

            // PESQUISANDO O USUÁRIO DO PERFIL
            logs.push(usuario + ' - Selecionando o Instagram')
            await pagina.waitForSelector('[id="instagram-tab"]')
            await pagina.click('[id="instagram-tab"]')
            await pagina.waitForTimeout(2000)

            // SELECIONANDO OS FILTROS AVANÇADOS
            logs.push(usuario + ' - Selecionando o filtro: Ativos')
            await pagina.waitForSelector('[id="filtrarPerfisStatus"]')
            await pagina.evaluate(()=>{
                return document.querySelector('[id="filtrarPerfisStatus"]').value = '1'
            })

            logs.push(usuario + ' - Mostrando os filtros avançados')
            await pagina.waitForSelector('[name="avancados"]')
            await pagina.click('[name="avancados"]')
            await pagina.waitForTimeout(2000)

            // PESQUISANDO O USUÁRIO DO PERFIL
            logs.push(usuario + ' - Procurando o usuário')
            await pagina.waitForSelector('[id="filtrarPerfisUsername"]')
            await pagina.type('[id="filtrarPerfisUsername"]', usuario)
            await pagina.waitForTimeout(2000)
            await pagina.click('[class="btn btn-primary mb-2"]')

            try{
                // VERIFICANDO SE O PERFIL JÁ FOI CADASTRADO
                logs.push(usuario + ' - Esperando carregar')
                await pagina.waitForSelector('[id="formMassGroups"]', { timeout: 10000 })
                logs.push(usuario + ` - Perfil encontrado com sucesso!`)   

                return true
            }catch(erro){
                logs.push('Não conseguimos adicionar o perfil, verifique o mesmo e tente novamente!')
                return false
            }
        }

    }catch(erro){
        logs.push('Não conseguimos adicionar o perfil, verifique o mesmo e tente novamente!')
        return false
    }
}

module.exports = cadastrarPerfilDIZU