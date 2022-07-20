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

const alterarBiografiaPerfil = async(pagina, usuario, generoPerfis, logs)=>{
    try{

        logs.push('Alterando a biografia')

        logs.push(usuario + ' - Redirecionando para o perfil.')
        await pagina.goto('https://www.instagram.com/' + usuario)
            
        logs.push(usuario + ' - Apertando em editar conta.')
        await pagina.waitForSelector('a[href="/accounts/edit/"]')
        await pagina.click('a[href="/accounts/edit/"]')

        logs.push(usuario + ' - Clicando na biografia.')
        await pagina.waitForSelector('#pepBio')
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
        await pagina.waitForSelector('#pepBio')
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
 
        return true 
    }catch(erro){
        if(contador == 3){
            logs.push(usuario + ' - Erro ao tentar alterar a biografia!')
            contador = 0
            return false
        }else{
            logs.push(usuario + ' - Não conseguimos alterar a biografia mas iremos tentar novamente.')
            contador = contador + 1
            await alterarBiografiaPerfil(pagina, usuario, generoPerfis, logs)
            contador = 0
            return false
        }
    }
}

module.exports = alterarBiografiaPerfil