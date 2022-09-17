const selecionarData = async(identificador, pagina, logs)=>{
    try{
        // Capturando dados da data
        logs.push('')
        logs.push('Escolhendo a data')
        logs.push('')
        const data = await pagina.evaluate(()=>{
            const mes = document.querySelector('[title="Mês:"]').querySelectorAll('option')
            const dia = document.querySelector('[title="Dia:"]').querySelectorAll('option')
        
            const mesAleatorio = Math.floor(Math.random() * mes.length + 1).toString()
            const diaAleatorio = Math.floor(Math.random() * dia.length + 1).toString()
            const anoAleatorio = Math.floor(Math.random() * 30 + 1970).toString()
            
            return {
                mesAleatorio,
                diaAleatorio,
                anoAleatorio
            }
        })
        
        // Selecionando o mês
        logs.push(`perfil ${identificador} - ` + 'Selecionando o mês')
        await pagina.select('[title="Mês:"]', data.mesAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Selecionando o dia
        logs.push(`perfil ${identificador} - ` + 'Selecionando o dia')
        await pagina.select('[title="Dia:"]', data.diaAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Selecionando o ano
        logs.push(`perfil ${identificador} - ` + 'Selecionando o ano')
        await pagina.select('[title="Ano:"]', data.anoAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Confirmar os dados
        logs.push(`perfil ${identificador} - ` + 'Confirmando a data')
        await pagina.evaluate(()=>{
            document.querySelectorAll('button[type="button"]')[1].click()
        })

        logs.push(`perfil ${identificador} - ` + 'Data confirmada com sucesso!')
        
        return {
            ok: true
        }

    }catch(erro){
        logs.push(`perfil ${identificador} - ` + 'Erro ao tentar selecionar a data.')
        return {
            ok: false
        }
    }
}

module.exports = selecionarData