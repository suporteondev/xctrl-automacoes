import React, { useState } from 'react'

// AcessoGerenciadorContext
export const AcessoGerenciadorContext = React.createContext({})

// AcessoGerenciadorProvider
export const AcessoGerenciadorProvider = ({ children }) => {

    // AcessoGerenciadors
    const [ acessoGerenciador, setAcessoGerenciador ] = useState({
        status: false,
        data: 'Sem acessso'
    })

    return <AcessoGerenciadorContext.Provider value={{ acessoGerenciador, setAcessoGerenciador }}>{children}</AcessoGerenciadorContext.Provider>
}

// Hook
export const useAcessoGerenciador = ()=> React.useContext(AcessoGerenciadorContext)