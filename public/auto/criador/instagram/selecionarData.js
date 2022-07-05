const selecionarData = async(x, pagina)=>{
    try{
        // Capturando dados da data
        global.criador.push('')
        global.criador.push('Escolhendo a data')
        global.criador.push('')
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
        global.criador.push(`Perfil ${x} - ` + 'Selecionando o mês')
        await pagina.select('[title="Mês:"]', data.mesAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Selecionando o dia
        global.criador.push(`Perfil ${x} - ` + 'Selecionando o dia')
        await pagina.select('[title="Dia:"]', data.diaAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Selecionando o ano
        global.criador.push(`Perfil ${x} - ` + 'Selecionando o ano')
        await pagina.select('[title="Ano:"]', data.anoAleatorio.toString())
        await pagina.waitForTimeout(1000)

        // Confirmar os dados
        global.criador.push(`Perfil ${x} - ` + 'Confirmando a data')
        await pagina.evaluate(()=>{
            document.querySelectorAll('button[type="button"]')[1].click()
        })

        global.criador.push(`Perfil ${x} - ` + 'Data confirmada!')
        
        return {
            ok: true
        }

    }catch(erro){
        console.log(erro.message)
        global.criador.push(`Perfil ${x} - ` + 'Erro ao tentar selecionar a data.')
        return {
            ok: false
        }
    }
}

module.exports = selecionarData