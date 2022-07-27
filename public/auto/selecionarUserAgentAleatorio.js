const userAgentsMobile = require('./userAgentsMobile')
const userAgentsDesktop = require('./userAgentsDesktop')

async function selecionarUserAgentAleatorio(pagina, userAgent){

    // SELECIONANDO UM USER AGENT ALEATÓRIO MOBILE
    if(userAgent == 'mobile'){

        // ESCOLHENDO UM USER AGENT ALEATÓRIO
        const userAgentsMobileEscolhido = userAgentsMobile[Math.floor(Math.random() * userAgentsMobile.length)]
        
        console.log(userAgentsMobileEscolhido)

        // CONFIGURANDO O USER AGENT
        return await pagina.setUserAgent(userAgentsMobileEscolhido)
    }

    // SELECIONANDO UM USER AGENT ALEATÓRIO DESKTOP
    if(userAgent == 'desktop'){

        // ESCOLHENDO UM USER AGENT ALEATÓRIO
        const userAgentsDesktopEscolhido = userAgentsDesktop[Math.floor(Math.random() * userAgentsDesktop.length)]
        
        console.log(userAgentsDesktopEscolhido)

        // CONFIGURANDO O USER AGENT
        return await pagina.setUserAgent(userAgentsDesktopEscolhido)
    }
}

module.exports = selecionarUserAgentAleatorio