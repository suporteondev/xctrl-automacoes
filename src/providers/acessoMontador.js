import React, { useState } from 'react'

// AcessoMontadorContext
export const AcessoMontadorContext = React.createContext({})

// AcessoMontadorProvider
export const AcessoMontadorProvider = ({ children }) => {

    // AcessoMontadors
    const [ acessoMontador, setAcessoMontador ] = useState({
        status: false,
        data: 'Sem acessso'
    })

    return <AcessoMontadorContext.Provider value={{ acessoMontador, setAcessoMontador }}>{children}</AcessoMontadorContext.Provider>
}

// Hook
export const useAcessoMontador = ()=> React.useContext(AcessoMontadorContext)