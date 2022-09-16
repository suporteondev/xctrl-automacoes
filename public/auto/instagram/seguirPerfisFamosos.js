const procurarBloqueios = require("./procurarBloqueios")

const perfis = [
    'agathagn_',
    'kyliejenner',
    'kendalljenner',
    'kimkardashian',
    'neymarjr',
    'larasilva',
    'mirella',
    'marvel',
    'virginia',
    'simonemendes',
    'leonardo',
    'marimaria',
    'mariasbaby',
    'jadepicon',
    'leosantana',
    'leopicon',
    'leodias',
    'larissamanoela',
    'maisa',
    'nathaliavalente',
    'claragnds',
    'marvelbrasil',
    'shadowhunterstv',
    'masterchefbr',
    'dapariz',
    'forbesbr',
    'vivisalvetti',
    'luvadepedreiro',
    'andreaguima5',
    'camilacoelho',
    'maiara',
    'maraisa',
    'flaviaalessandra',
    'loracarola',
    'rodrigofaro',
    'ricoof',
    'marcosmion',
    'jbboninho',
    'livia',
    'romeufelipe',
    'alfinetei',
    'dennisdj',
    'luisasonza',
    'ludmilla',
    'choquei',
    'gessicakayane',
    'eliana',
    'dudubarros',
    'dudufarias',
    'podcats'
]

const seguirPerfisFamosos = async(pagina, usuario, seguirPerfis, esperarEntre, logs)=>{
    try{

        logs.push(`Seguindo perfis verificados`)
        
        // SEGUINDO OS PERFIS
        for(let x = 0; x < perfis.length; x++){
            try{

                const bloqueio = await procurarBloqueios(pagina, usuario, logs)
                if(bloqueio == true){ break }

                // CAPTURANDO O USUÁRIO DO PERFIL A SER SEGUIDO
                const usuarioPerfil = perfis[x]

                // ACESSANDO O PERFIL DO USUÁRIO
                logs.push(`${usuario} - Acessando o ${x + 1}º perfil`)
                await pagina.goto(`https://www.instagram.com/${usuarioPerfil}/`)

                // SEGUINDO O USUÁRIO
                logs.push(`${usuario} - Seguindo o perfil ${usuarioPerfil}`)
                await pagina.waitForSelector('._acan._acap._acas')
                await pagina.click('._acan._acap._acas')
                logs.push(`${usuario} - Perfil seguido com sucesso!`)

                // AGUARDANDO O TEMPO CONFIGURADO
                if(esperarEntre != 0){
                    logs.push(`${usuario} - Aguardando ${esperarEntre / 1000} segundos.`)
                    await pagina.waitForTimeout(esperarEntre)
                }

                if(x == (seguirPerfis - 1)){
                    break
                }
            }catch(erro){
                logs.push(`${usuario} - Não conseguimos seguir o perfil!`)
                if(x == (seguirPerfis - 1)){
                    break
                }
                console.log(erro.message)
            }
        }

        return true 
    }catch(erro){
        logs.push(usuario + ' - Erro ao tentar seguir os perfis!')
        return false
    }
}

module.exports = seguirPerfisFamosos