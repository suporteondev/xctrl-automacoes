import React, { useEffect, useState } from 'react'

// AcessoCriadorContext
export const AcessoCriadorContext = React.createContext({})

// AcessoCriadorProvider
export const AcessoCriadorProvider = ({ children }) => {

    // AcessoCriadors
    const [ acessoCriador, setAcessoCriador ] = useState({
        status: false,
        data: 'Sem acessso'
    })

    return <AcessoCriadorContext.Provider value={{ acessoCriador, setAcessoCriador }}>{children}</AcessoCriadorContext.Provider>
}

// Hook
export const useAcessoCriador = ()=> React.useContext(AcessoCriadorContext)