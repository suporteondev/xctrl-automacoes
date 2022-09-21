import React, { useState } from 'react'

// PerfisSelecionadosGerenciadorContext
export const PerfisSelecionadosGerenciadorContext = React.createContext({})

// PerfisSelecionadosGerenciadorProvider
export const PerfisSelecionadosGerenciadorProvider = ({ children }) => {

    // PerfisSelecionadosGerenciadors
    const [ perfisSelecionadosGerenciador, setPerfisSelecionadosGerenciador ] = useState([])

    return <PerfisSelecionadosGerenciadorContext.Provider value={{ perfisSelecionadosGerenciador, setPerfisSelecionadosGerenciador }}>{children}</PerfisSelecionadosGerenciadorContext.Provider>
}

// Hook
export const usePerfisSelecionadosGerenciador = ()=> React.useContext(PerfisSelecionadosGerenciadorContext)