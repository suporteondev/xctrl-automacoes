const verInformacoesGni = async(pagina)=>{
    try{

        global.removedor.push('Capturando informações')

        global.removedor.push('Acessando a gerência de perfis')
        await pagina.goto('https://www.ganharnoinsta.com/painel/?pagina=gerenciar_contas', { timeout: 60000 })

        global.removedor.push('Procurando perfis desativados')

        try{
            await pagina.waitForSelector('input[type="search"]', { timeout: 60000 })
            await pagina.type('input[type="search"]', 'Reativar Conta')
            await pagina.waitForSelector('a[class="btn btn-danger btn-sm"]', { timeout: 60000 })
            global.removedor.push('Perfis desativados encontrados!')
        }catch(erro){
            global.removedor.push('Você não tem perfis desativados!')
            return true
        }

        const { totalDesativados, totalSaldo } = await pagina.evaluate(()=>{

            const perfisDesativados = document.querySelectorAll('tbody td:nth-child(3)')
            
            let totalSaldo = 0
            let totalPerfis = 0

            perfisDesativados.forEach((perfil)=>{
                const saldo = perfil.innerText
                if(saldo.includes('Valor a Ser Descontado: R$')){
                    totalSaldo = totalSaldo + Number(saldo.split(' ')[6].replace(',', '.'))
                }else{
                    totalSaldo = totalSaldo + Number(saldo.split(' ')[4].replace(',', '.'))
                }
                totalPerfis = totalPerfis + 1
            })

            return {
                totalDesativados: totalPerfis,
                totalSaldo: totalSaldo
            }
        })
    
        global.removedor.push('Perfis desativados: ' + totalDesativados)
        global.removedor.push('Saldo a ser perdido: ' + totalSaldo.toFixed(2))


    }catch(erro){
        
    }
}

module.exports = verInformacoesGni